# Documentação Completa de Segurança: Gerenciamento de Chaves Secretas e Variáveis de Ambiente

| Campo | Valor |
|-------|-------|
| **Projeto** | smokebuzz (SmokeBuzz Tabacaria) |
| **Versão do documento** | 1.0 |
| **Data** | 02/08/2026 |
| **Status** | OBRIGATÓRIO |
| **Aplicável a** | Todos os agentes de IA, desenvolvedores e pipelines que toquem neste repositório |

---

## 1. 🎯 Objetivo e Regras Gerais para Agentes de IA

Este documento é a fonte de verdade de segurança do repositório **SmokeBuzz Tabacaria**. Define **como** chaves secretas, tokens e variáveis de ambiente devem ser criados, armazenados, usados e rotacionados — e, principalmente, **o que é estritamente proibido**.

Estas regras valem para **qualquer agente de IA**, humano ou pipeline que modifique este repositório. Se um agente não souber onde colocar um segredo, a resposta padrão é: **NÃO exponha**. Quando em dúvida, pergunte antes de agir.

### ✅ Sempre faça (regras obrigatórias)

- **Use variáveis de ambiente** para toda credencial: senhas, tokens de API, chaves secretas, URLs de acesso autenticado.
- **Valide o contexto do valor** antes de usá-lo: ele é público (pode ir para o bundle web) ou secreto (só pode viver no backend)?
- **Siga o nível de classificação** descrito na seção 3. Um valor de Nível 1 jamais deve aparecer em um arquivo consumido pelo frontend.
- **Documente** todo segredo criado, sua finalidade, dono e prazo de rotação (seção 8).
- **Revise o código antes de commitar** usando o checklist obrigatório da seção 9.

### ❌ Nunca faça (proibições absolutas)

- ❌ **Nunca commite um arquivo `.env`** ou qualquer arquivo que contenha segredos reais.
- ❌ **Nunca coloque segredos em arquivos versionados** — `.ts`, `.tsx`, `.js`, `.json`, `.yml`, `.yaml`, `.md`, `app.json`, `manifest.json`.
- ❌ **Nunca use `EXPO_PUBLIC_` para segredos.** Qualquer variável com esse prefixo é embutida no bundle web do PWA e pode ser lida por qualquer usuário (seção 5.1).
- ❌ **Nunca logue, imprima, serialize ou exiba credenciais** em logs, telas, mensagens de erro ou respostas de API.
- ❌ **Nunca invente chaves reais em exemplos.** Use sempre placeholders óbvios (`SUA_CHAVE_AQUI`, `eyJ...EXEMPLO`).
- ❌ **Nunca contorne a regra do desktop bridge** (seção 5.5): nada de `require('fs')`, `ipcRenderer` ou APIs Tauri no código em `src/`.

> **Sobre o estado atual do SmokeBuzz:** hoje o app **não possui nenhum segredo** (ver seção 2). As proibições acima existem para evitar que o primeiro segredo criado — quando um backend/pagamento real for adicionado — já nasça vazado. Segurança se constrói antes do segredo existir.

---

## 2. 🏗️ Postura de Segurança Atual do SmokeBuzz

**IMPORTANTE: esta seção descreve a realidade atual do repositório de forma honesta.**

### O que existe hoje (sessão nova)

- **Aplicação 100% client-side e MOCK.** Não há backend, Supabase, autenticação nem pagamento real.
- **Pagamento mock** em `src/hooks/usePayment.ts`: espera ~2 segundos e falha aleatoriamente em 10% das tentativas. Nenhuma chave, nenhum processador, nenhum dado bancário é tocado.
- **Dados de produto hardcoded** em `src/data/products.ts` (dados de demonstração: sedas, piteiras, filtros — preços fixos, sem integração).
- **Zero arquivos `.env`** no repositório.
- **Único uso de `process.env`:** nos scripts de ferramenta de desenvolvimento — `scripts/screenshot-compare.js` lê `BASE_URL` e `SCREENSHOTS` (valores **não sensíveis**, apenas para captura de screenshots).
- **A lacuna conhecida:** o `.gitignore` ignora `.env.local`, `.env.development.local`, `.env.test.local` e `.env.production.local`, **mas NÃO ignora `.env` simples**. Isso precisa ser corrigido (seção 4).

### O que muda quando um backend/pagamento real for adicionado

Quando o SmokeBuzz evoluir para produção, o cenário muda drasticamente:

- Um **backend Node.js** gerenciará segredos de Nível 1 e 2 (JWT, service-role, tokens de pagamento).
- Um **banco de dados com RLS** (ex.: Supabase) protegerá os dados do cliente.
- O **pagamento real** (Stripe, Pagar.me, Mercado Pago) introduzirá chaves secretas e chaves publicáveis.
- O **frontend** continuará limitado a valores públicos (Nível 3) via `EXPO_PUBLIC_`.

Este documento já especifica a arquitetura-alvo para que o terreno esteja pronto.

### Diagrama de arquitetura (3 camadas)

```
┌──────────────────────────────────────────────────────────────────────┐
│  CAMADA CLIENTE — Expo / PWA (React Native 0.74 + Expo ~51)          │
│  Só valores PÚBLICOS: EXPO_PUBLIC_ (Nível 3)                          │
│                                                                        │
│  • EXPO_PUBLIC_SUPABASE_ANON_KEY        (pública, exige RLS no banco)  │
│  • EXPO_PUBLIC_API_URL                  (pública)                      │
│  • EXPO_PUBLIC_PAYMENT_PUBLISHABLE_KEY  (publicável)                   │
│                                                                        │
│  ❌ NUNCA: service_role, JWT secret, secret keys de pagamento,         │
│           senhas de banco, tokens de deploy.                           │
└──────────────────────────┬─────────────────────────────────────────────┘
                           │  HTTPS (API pública do backend)
                           ▼
┌──────────────────────────────────────────────────────────────────────┐
│  CAMADA BACKEND (FUTURA) — Node.js                                    │
│  Segredos Nível 1 e 2: apenas aqui                                    │
│                                                                        │
│  • SERVICE_ROLE / SUPABASE_SERVICE_ROLE   (Nível 1)                    │
│  • JWT_SECRET                            (Nível 1)                     │
│  • SENHA_DO_BANCO / DATABASE_URL          (Nível 1/2)                  │
│  • Stripe/Pagar.me/Mercado Pago SECRET    (Nível 1)                    │
│  • Tokens de deploy (CI)                 (Nível 1)                     │
└──────────────────────────┬─────────────────────────────────────────────┘
                           │  via SDK autenticado (service-role internamente)
                           ▼
┌──────────────────────────────────────────────────────────────────────┐
│  CAMADA BANCO DE DADOS (FUTURA) — Postgres/Supabase                   │
│                                                                        │
│  • RLS OBRIGATÓRIO em TODAS as tabelas                                 │
│  • Cliente anônimo usa auth.uid() para ler/apenas seus próprios       │
│    pedidos (orders, order_items)                                       │
│  • Admin de loja futuro usa service_role (nunca exposto ao cliente)    │
└──────────────────────────────────────────────────────────────────────┘
```

**Regra de ouro:** o segredo "desce" no máximo até a camada onde a informação é autorizada. Cliente = Nível 3. Backend = Nível 1/2. Banco = RLS decide linha a linha.

---

## 3. 🔐 Classificação Completa de Chaves e Segredos

Toda variável/segredo do SmokeBuzz deve ser classificado em um dos 4 níveis abaixo. **Nunca suba um valor de nível em relação ao seu uso real.**

| Nível | Nome | Pode ser usado por | Exemplos no SmokeBuzz | Onde viver |
|-------|------|--------------------|------------------------|------------|
| **1** | Secreto crítico | Somente backend futuro | `SERVICE_ROLE`, `JWT_SECRET`, senhas de banco, **secret keys de pagamento** (Stripe `sk_live_...`, Pagar.me, Mercado Pago), tokens de deploy do CI | Env do servidor / GitHub Secrets. Nunca no cliente |
| **2** | Secreto interno | Somente backend futuro | `DATABASE_URL`, segredos de OAuth (client secret) | Env do servidor / GitHub Secrets |
| **3** | Semi-pública (cliente) | Expo/PWA — exige RLS no banco | `EXPO_PUBLIC_SUPABASE_ANON_KEY`, `EXPO_PUBLIC_API_URL`, `EXPO_PUBLIC_PAYMENT_PUBLISHABLE_KEY` | `.env` local + bundle web (público, aceito) |
| **4** | Pública | Qualquer lugar | URLs públicas, feature flags, nomes de rotas, manifest | Código-fonte, `manifest.json`, meta tags |

### 3.1 Regras por nível

- **Nível 1 — Secreto crítico:** a exposição = comprometimento total (leitura de banco, falsificação de JWT, captura de pagamentos). Rotação imediata obrigatória (seção 8). Nunca em `EXPO_PUBLIC_`, nunca em `.ts/.json/.yml` versionados, nunca em logs.
- **Nível 2 — Secreto interno:** exposição facilita ataques laterais (conexão direta ao banco, impersonação OAuth). Mesmas regras do Nível 1.
- **Nível 3 — Semi-pública:** é **público por construção** no PWA (qualquer pessoa abre o bundle e lê). Por isso, o Nível 3 só é seguro se o banco tiver **RLS obrigatório** — o anon key é apenas a porta de entrada; quem define o que cada usuário vê é a política do banco.
- **Nível 4 — Pública:** sem restrição, mas não coloque segredos acidentalmente junto (ex.: não deixe um `API_KEY` esquecido no `manifest.json`).

---

## 4. 📂 Arquivos de Ambiente

### 4.1 Estado atual

**Não existe nenhum arquivo `.env` neste repositório.** O único uso de variáveis de ambiente está em `scripts/screenshot-compare.js` (`BASE_URL`, `SCREENSHOTS` — não sensíveis).

### 4.2 Layout pretendido (quando houver backend)

| Arquivo | Versionado? | Finalidade |
|---------|-------------|------------|
| `.env.example` | ✅ Sim | Placeholders e documentação das variáveis esperadas (sem nenhum valor real) |
| `.env` | ❌ Nunca | Valores reais locais — deve estar no `.gitignore` |
| `.env.local` | ❌ Nunca | Override local de desenvolvimento |
| `.env.<ambiente>` | ❌ Nunca | Overrides por ambiente |

### 4.3 ⚠️ Lacuna no `.gitignore` (a corrigir)

O `.gitignore` atual cobre os `.env.*` com sufixo, mas **não** o `.env` simples. Bloco recomendado:

```gitignore
# Variáveis de ambiente — NUNCA versionar valores reais
.env
.env.*
!.env.example
```

> Substituir as linhas 9–12 do `.gitignore` atual (que listam apenas `.env.local`, `.env.development.local`, `.env.test.local`, `.env.production.local`) pelo bloco acima elimina a lacuna de uma vez.

### 4.4 Template `.env.example` do SmokeBuzz (placeholders apenas)

```bash
# ══════════════════════════════════════════════════════════════════
# SmokeBuzz Tabacaria — Exemplo de variáveis de ambiente
# ══════════════════════════════════════════════════════════════════
# COPIE este arquivo para .env e preencha com VALORES REAIS locais.
# NUNCA commite o arquivo .env. Valores reais NUNCA vão para git.
#
# Variáveis com prefixo EXPO_PUBLIC_ são EMBUTIDAS no bundle web do
# PWA — são PÚBLICAS por construção. Só coloque aqui valores Nível 3.

# ── API do backend futuro (pública) ───────────────────────────────
EXPO_PUBLIC_API_URL=http://localhost:3000

# ── Supabase (futuro) ─────────────────────────────────────────────
EXPO_PUBLIC_SUPABASE_URL=https://SUA_INSTANCIA.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=eyJ...EXEMPLO

# ── Pagamento (futuro) — apenas a chave PUBLICÁVEL ────────────────
EXPO_PUBLIC_PAYMENT_PUBLISHABLE_KEY=pk_test_SUA_CHAVE_AQUI

# ══════════════════════════════════════════════════════════════════
# ❌ PROIBIDO colocar no .env do FRONTEND (e jamais em EXPO_PUBLIC_):
# ══════════════════════════════════════════════════════════════════
# SERVICE_ROLE / SUPABASE_SERVICE_ROLE   → apenas backend
# JWT_SECRET                             → apenas backend
# DATABASE_URL / senha do banco          → apenas backend
# sk_live_... (secret key de pagamento)  → apenas backend
# Tokens de deploy / OAuth client secret → apenas CI/backend
# ══════════════════════════════════════════════════════════════════
```

---

## 5. 💻 Regras por Stack

### 5.1 Expo / React Native / PWA

A aplicação é um PWA construído com `expo export -p web` (via `npm run build:web` → `dist/`). Isso tem uma consequência de segurança decisiva:

> **TUDO que começa com `EXPO_PUBLIC_` é embutido no bundle web.** Qualquer usuário pode abrir o `dist/` e ler o valor. Trate como público.

#### Regras

- Só use `EXPO_PUBLIC_` para valores **Nível 3** (URLs públicas, anon key, publishable key).
- **Nunca** use `EXPO_PUBLIC_` para `SERVICE_ROLE`, `JWT_SECRET`, secret keys, senhas.
- **Nunca** coloque segredos no `app.json`, no `manifest.json` do PWA ou em meta tags HTML geradas pelo `postbuild.js`.
- Não confie em ofuscação: o bundle pode ser desminificado por qualquer pessoa.

#### Exemplo correto (futuro — valores Nível 3)

```ts
// API pública e chave anon são aceitáveis no cliente (exigem RLS no banco)
const apiUrl = process.env.EXPO_PUBLIC_API_URL;
const anonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

// Exemplo futuro (somente quando Supabase existir):
// const supabase = createClient(apiUrl, anonKey);
```

#### Exemplo incorreto (NUNCA faça)

```ts
// ❌ EXPO_PUBLIC_ com segredo = segredo no bundle público
const serviceRole = process.env.EXPO_PUBLIC_SERVICE_ROLE; // VAZADO!
const jwt = process.env.EXPO_PUBLIC_JWT_SECRET; // VAZADO!
const sk = process.env.EXPO_PUBLIC_PAYMENT_SECRET_KEY; // VAZADO!
```

**Regra prática:** se o valor começa com `sk_`, `service_role`, `secret`, `jwt` ou parece senha — **ele não pode ter prefixo `EXPO_PUBLIC_` e não pode estar em `src/`**.

### 5.2 Backend futuro (Node.js)

Quando o backend surgir, aplicam-se estas regras gerais:

- Use `dotenv` para carregar `.env` apenas em desenvolvimento; em produção use variáveis do ambiente do servidor (ou GitHub Secrets no CI).
- **Valide as variáveis obrigatórias na inicialização** — o servidor deve **falhar rápido** se faltar um segredo, em vez de rodar quebrado.
- **Sanitize logs**: nunca logue o valor de `process.env`. Nunca serialize o objeto `process.env`.
- **Nunca devolva env vars em respostas de API** (nem por acidente em payloads de erro ou debug).
- `SERVICE_ROLE`/secret keys de pagamento **só** devem ser usados **após autorização** no servidor — nunca expostos ao cliente.

#### Exemplo correto

```ts
// validação na inicialização
const required = ["SERVICE_ROLE", "JWT_SECRET", "DATABASE_URL"];
for (const k of required) {
  if (!process.env[k]) throw new Error(`Variável obrigatória ausente: ${k}`);
}

// nunca logue o valor — só a presença/ausência
console.log(`SERVICE_ROLE: ${process.env.SERVICE_ROLE ? "configurado" : "AUSENTE"}`);
```

#### Exemplo incorreto

```ts
// ❌ loga o segredo
console.log("service role:", process.env.SERVICE_ROLE);

// ❌ devolve env vars na resposta da API
app.get("/api/debug", (req, res) => res.json(process.env));
```

### 5.3 Supabase / banco futuro — RLS

**Regra de ouro (RLS):** toda tabela **deve** ter `ENABLE ROW LEVEL SECURITY` habilitado **e** políticas explícitas de leitura/escrita. Sem isso, um cliente usando a anon key (pública) pode ler/escrever qualquer linha.

#### Blueprint de schema (loja SmokeBuzz — e-commerce, NÃO OpenBand)

Tabelas: `categories`, `products`, `orders`, `order_items`, `profiles`.

```sql
-- ── Categorias: leitura pública para qualquer visitante ──────────
create table categories (
  id       uuid primary key default gen_random_uuid(),
  slug     text not null unique,
  name     text not null,
  position int  not null default 0
);
alter table categories enable row level security;
create policy "categories public read" on categories
  for select using (true);

-- ── Produtos: leitura pública (vitrine) ──────────────────────────
create table products (
  id          uuid primary key default gen_random_uuid(),
  category_id uuid references categories(id),
  name        text not null,
  description text,
  price_cents int  not null,
  image_url   text,
  active      boolean not null default true
);
alter table products enable row level security;
create policy "products public read active" on products
  for select using (active = true);

-- ── Pedidos: somente o dono lê/altera o próprio pedido ───────────
create table orders (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null default auth.uid(),
  status      text not null default 'pending',
  total_cents int  not null,
  created_at  timestamptz not null default now()
);
alter table orders enable row level security;
create policy "orders owner read" on orders
  for select using (auth.uid() = user_id);
create policy "orders owner insert" on orders
  for insert with check (auth.uid() = user_id);

-- ── Itens do pedido: acompanham a regra do pedido pai ────────────
create table order_items (
  id          uuid primary key default gen_random_uuid(),
  order_id    uuid references orders(id),
  product_id  uuid references products(id),
  quantity    int  not null,
  unit_cents  int  not null
);
alter table order_items enable row level security;
create policy "order_items owner read" on order_items
  for select using (
    exists (select 1 from orders o
            where o.id = order_items.order_id
              and o.user_id = auth.uid())
  );
create policy "order_items owner insert" on order_items
  for insert with check (
    exists (select 1 from orders o
            where o.id = order_items.order_id
              and o.user_id = auth.uid())
  );

-- ── Perfis de cliente: o usuário gerencia o próprio perfil ───────
create table profiles (
  id      uuid primary key references auth.users(id),
  name    text,
  email   text
);
alter table profiles enable row level security;
create policy "profiles owner all" on profiles
  for all using (auth.uid() = id)
  with check (auth.uid() = id);

-- ── Índices nas colunas de FK e de RLS ───────────────────────────
create index idx_products_category_id  on products (category_id);
create index idx_orders_user_id        on orders (user_id);        -- usado pela política RLS
create index idx_order_items_order_id  on order_items (order_id);
```

> **Admin de loja (futuro):** não existe papel de "admin público". Administração da vitrine será feita via `service_role` (backend autorizado), **nunca** exposta a clientes.

#### Semântica de `USING` / `WITH CHECK`

| Cláusula | Significado | Aplicação no schema acima |
|----------|-------------|---------------------------|
| `USING (expressão)` | Filtra linhas **existentes** que o usuário pode **ver/afetar** | `orders owner read`, `products public read active` |
| `WITH CHECK (expressão)` | Valida linhas **novas/alterações** que o usuário pode **criar/alterar** | `orders owner insert`, `profiles owner all` |
| `FOR ALL` | Aplica a política a `select`, `insert`, `update`, `delete` | `profiles owner all` |
| Combinação `USING` + `WITH CHECK` | Exige as duas condições em operações de escrita | `order_items owner insert` (pedido tem que ser do usuário) |

### 5.4 CI/CD (futuro, GitHub Actions)

> Hoje o repositório **não possui `.github/`** — esta seção é a especificação para quando o CI chegar.

- Guarde segredos em **GitHub Secrets** do repositório; **nunca hardcode** em `.yml` do workflow.
- Defina **`permissions:` mínimas** no workflow (evite `contents: write` global quando não for necessário).
- Rode **gitleaks scan** em **todo PR** (ver seção 6) antes do build.

#### Exemplo correto (build/test com `.env` gerado de secrets)

```yaml
name: CI
on: [push, pull_request]

permissions:
  contents: read

jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Gitleaks
        uses: gitleaks/gitleaks-action@v2
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Install
        run: npm ci

      - name: Typecheck
        run: npx tsc --noEmit

      - name: Test
        run: npm test

      - name: Build web
        run: npm run build:web
        env:
          EXPO_PUBLIC_API_URL: ${{ secrets.EXPO_PUBLIC_API_URL }}
```

> Os `${{ secrets.* }}` são injetados pelo GitHub apenas no runtime do workflow — nunca aparecem no repositório.

### 5.5 Integração com o desktop OpenBand (bridge) — REGRA OBRIGATÓRIA

O SmokeBuzz roda dentro do ecossistema desktop **OpenBand**. Esta é a regra específica do `AGENTS.md` e é **innegociável**:

- ❌ **Nunca** use `require('fs')`, `ipcRenderer` ou APIs Tauri em **nenhum arquivo em `src/`** (código de frontend).
- ✅ Todo I/O nativo de desktop deve passar por **`OpenBandNative`** (importado de `@bridge`).
- ❌ **Nunca exponha variáveis de ambiente secretas através do bridge.** Se o `OpenBandNative` fornecer acesso a env vars, ele é um canal de Nível 4/público — segredos Nível 1/2 não podem trafegar por ele.
- ✅ Scripts de ferramenta fora de `src/` (ex.: `scripts/`) podem usar Node, mas **nunca** devem ler nem imprimir segredos.

**Teste mental:** se o valor é secreto e o caminho de acesso envolve o bundle web ou o bridge do desktop → pare, o valor deve ficar no backend.

---

## 6. 🛡️ Prevenção de Vazamentos Acidentais

### 6.1 Gitleaks

> Hoje não existe `.gitleaks.toml` no repositório — instalação é parte do setup recomendado.

- **Instalação local:** `brew install gitleaks` (macOS) ou `choco install gitleaks` (Windows), ou binário de https://github.com/gitleaks/gitleaks.
- **Scan local:** `gitleaks detect --source . --verbose`.
- **CI:** `gitleaks/gitleaks-action@v2` em todo PR (exemplo na seção 5.4).

#### `.gitleaks.toml` (exemplo com allowlist)

```toml
title = "SmokeBuzz Gitleaks Config"

[[rules]]
  id = "smokebuzz-aws-key"
  description = "AWS Access Key"
  regex = '''AKIA[0-9A-Z]{16}'''
  [rules.entropies]
    min = 3.5
    max = 8

[[allowlist]]
  description = "Arquivos que podem conter placeholders"
  paths = [
    '''.*\.env\.example''',
    '''docs/''',
    '''openspec/''',
  ]
  regexes = [
    '''SUA_CHAVE_AQUI''',
    '''eyJ.*EXEMPLO''',
    '''pk_test_.*''',
  ]
```

> O allowlist garante que placeholders (`SUA_CHAVE_AQUI`, `eyJ...EXEMPLO`) usados em `.env.example`, `docs/` e `openspec/` não disparem falsos positivos — sem permitir nenhum segredo real.

### 6.2 Pre-commit hook (exemplo)

```bash
#!/usr/bin/env bash
# .git/hooks/pre-commit
gitleaks protect --staged --verbose || exit 1
```

Instalação rápida: `gitleaks protect --staged --staged-verbose` é o modo interativo; ou use `pre-commit install` com o config da [gitleaks/pre-commit](https://github.com/gitleaks/gitleaks#pre-commit).

### 6.3 Greps manuais rápidos

```bash
# JWTs (lado a lado com allowlist de EXEMPLO)
rg -n "eyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}" --glob '!docs/**' --glob '!openspec/**'

# Chaves secretas típicas
rg -ni "sk_live_|service_role|jwt_secret|secret_key|api[_-]?secret" src/ scripts/ app.json

# Arquivos .env acidentalmente presentes
find . -name ".env" -not -path "./node_modules/*" -not -path "./.git/*"
```

---

## 7. 🚨 Procedimento de Incidente

Se um segredo for exposto (commit, bundle, log), execute as fases **em ordem**, sem pular nenhuma.

### FASE 1 — CONTER (primeiros 60 minutos)

1. **Rotacione/revogue o segredo imediatamente** na plataforma de origem (painel do provider, banco, Supabase, GitHub).
2. Remova o acesso ativo: revogue tokens, gere novo par de chaves, altere senhas.
3. Pare o uso do valor comprometido em qualquer serviço que o consuma.
4. A chave nova **não** deve ter a mesma exposição: corrija a causa raiz antes de reaplicar.

### FASE 2 — AVALIAR (logs e auditoria)

1. Identifique **onde** e **quando** vazou: histórico de commits, bundle publicado, logs do CI.
2. Verifique o escopo completo:
   ```bash
   git log --all --full-history -p -S "CHAVE_COMPROMETIDA" -- .
   ```
3. Avalie impacto: quem leu? O que o segredo protegia (banco, pagamentos, deploys)? Houve acesso indevido? Rode o mesmo grep no `dist/` publicado.
4. Documente a janela de exposição no histórico de alterações (seção 12).

### FASE 3 — CORRIGIR

1. Purge o segredo do histórico do git com `git filter-repo`:
   ```bash
   git filter-repo --invert-paths --path-match "(^|/)(\.env)$"
   git push origin --force --all
   ```
   > Forçar push exige revisão e aviso à equipe (ninguém deve continuar com clones do histórico antigo).
2. Adicione o segredo ao **denylist** do gitleaks (seção 6) para prevenir re-commit.
3. Adicione o arquivo responsável ao `.gitignore` (se o caso, o `.env`).
4. Feche a causa raiz: validação de env na inicialização, `EXPO_PUBLIC_` indevido, log não sanitizado, etc.

### FASE 4 — NOTIFICAR (LGPD / GDPR)

1. Se o segredo expôs **dados pessoais** de clientes (nome, e-mail, endereço, pedidos), avalie notificação à **ANPD (LGPD — Brasil)** e/ou **GDPR (UE)**.
2. Notifique clientes afetados com transparência: o que vazou, riscos, medidas tomadas.
3. Documente o incidente e a resposta — virará insumo do histórico de alterações.

---

## 8. 🔄 Política de Rotação de Chaves

| Segredo | Prazo de rotação | Observação |
|---------|------------------|------------|
| `SERVICE_ROLE` (Supabase) | 90 dias | Rotação imediata se houver suspeita de vazamento |
| `SUPABASE_ANON_KEY` | 180 dias | Pública; rotação só muda a "porta", não a segurança (RLS é o que importa) |
| `JWT_SECRET` | 90 dias | Rotação imediata se houver suspeita de vazamento |
| Tokens de CI/CD | 60 dias | GitHub tokens com tempo de vida curto quando possível |
| Senhas de banco | 90 dias | Armazenadas apenas no backend/CI |
| Segredos de OAuth (client secret) | 180 dias | Rotação imediata em caso de revogação do app |

> No estado atual do SmokeBuzz não há segredos para rotacionar. Esta tabela entra em vigor **no momento em que o primeiro segredo real for criado**.

---

## 9. 📋 Checklist OBRIGATÓRIO para Revisão de Código

Todo PR, commit ou alteração de agente de IA **deve** passar por este checklist antes de ser considerado pronto.

### 🔑 Chaves e variáveis de ambiente
- [ ] Nenhum arquivo `.env` (ou `.env.*` real) foi adicionado ao git.
- [ ] Nenhum segredo hardcoded em `.ts`, `.tsx`, `.js`, `.json`, `.yml`, `.md`, `app.json`, `manifest.json`.
- [ ] Todo valor novo foi classificado em um dos 4 níveis (seção 3).
- [ ] `.env.example` atualizado com placeholders (`SUA_CHAVE_AQUI`) sempre que um novo env var surgir.
- [ ] `.gitignore` cobre `.env`, `.env.*` e `!.env.example`.

### 🗄️ Banco de dados / RLS (schema e-commerce)
- [ ] `orders`, `order_items`, `profiles` só são acessíveis pelo dono (`auth.uid()`).
- [ ] `products` e `categories` têm leitura pública, mas escrita restrita (service_role).
- [ ] `ENABLE ROW LEVEL SECURITY` presente em **todas** as tabelas.
- [ ] `WITH CHECK` presente em toda política de insert/update.
- [ ] Índices criados nas colunas de FK e de RLS (`user_id`, `order_id`, `category_id`).

### 📱 Frontend / Expo
- [ ] Só existem env vars `EXPO_PUBLIC_` de Nível 3 (URL, anon, publishable key).
- [ ] Nenhum `SERVICE_ROLE`, `JWT_SECRET`, secret key de pagamento ou senha em `src/`.
- [ ] Nenhum segredo em `AsyncStorage`/storage local, log, mensagem de erro ou meta tags.
- [ ] O bundle web (`dist/`) não contém nenhum valor Nível 1/2 (verificar com grep na seção 6.3).

### ⚙️ Backend futuro
- [ ] Variáveis obrigatórias validadas na inicialização (falha rápida).
- [ ] Logs sanitizados (nunca o valor do segredo).
- [ ] Nenhuma env var retornada em respostas de API.

### 🚀 CI/CD
- [ ] Nenhum segredo hardcoded em `.yml`.
- [ ] `permissions:` mínimas no workflow.
- [ ] Gitleaks rodando em todo PR.

### 🖥️ OpenBand (bridge)
- [ ] Nenhum `require('fs')`, `ipcRenderer` ou API Tauri em `src/`.
- [ ] Todo I/O nativo via `OpenBandNative` de `@bridge`.
- [ ] O bridge não expõe nenhuma env var secreta ao frontend.

---

## 10. 🤖 Regras ESPECÍFICAS para Agentes de IA

### Princípios

1. **Em dúvida, NÃO exponha.** Se você não tem certeza se um valor é seguro para o contexto, trate como secreto.
2. **Nunca invente chaves.** Em exemplos e placeholders, use sempre `SUA_CHAVE_AQUI`, `eyJ...EXEMPLO` — nunca crie valores que pareçam reais.
3. **Valide o contexto antes de usar.** Pergunte: quem consome este arquivo? Frontend (bundle público), backend, CI, banco?
4. **RLS por padrão.** Toda tabela futura nasce com `ENABLE ROW LEVEL SECURITY` e políticas explícitas.
5. **Documente tudo.** Toda variável criada entra no `.env.example` e, quando houver, na classificação da seção 3.

### Matriz de decisão rápida (adaptada ao SmokeBuzz)

| Pergunta do agente | Resposta | Onde/Como |
|--------------------|----------|-----------|
| "Posso colocar a chave **secret** do pagamento (`sk_...`) no frontend?" | ❌ **NUNCA** | Apenas backend, nunca `EXPO_PUBLIC_` |
| "Criei a tabela `orders`, preciso de RLS?" | ✅ **Sim, obrigatório** | `ENABLE ROW LEVEL SECURITY` + políticas `auth.uid()` |
| "Posso colocar `JWT_SECRET` no `.env` da raiz do frontend?" | ❌ **Não** | Apenas backend (Nível 1/2) |
| "Posso colocar a chave **publishable** de pagamento (`pk_...`)?" | ✅ Sim | `EXPO_PUBLIC_PAYMENT_PUBLISHABLE_KEY` (Nível 3) |
| "`EXPO_PUBLIC_SUPABASE_ANON_KEY` é segura?" | ✅ Sim, **com RLS** | Pública por construção; o banco decide o que o usuário vê |
| "Esse valor é seguro para `EXPO_PUBLIC_`?" | Verifique | URL / anon / publishable = ✅; senha / secret / service_role = ❌ |
| "Preciso criar um `.env` novo para testes locais?" | ✅ Crie, mas não commite | Copie de `.env.example`, preencha, e garanta que está no `.gitignore` |
| "Posso usar `require('fs')` no `src/` para ler uma config?" | ❌ **NUNCA** | Use `OpenBandNative` de `@bridge` (AGENTS.md) |

---

## 11. 📚 Referências

### Documentação externa
- [Expo: Environment variables (`EXPO_PUBLIC_`)](https://docs.expo.dev/guides/environment-variables/)
- [Supabase: Environment variables / keys](https://supabase.com/docs/guides/api)
- [Supabase: Row Level Security](https://supabase.com/docs/guides/database/postgres/row-level-security)
- [GitHub: Using secrets in GitHub Actions](https://docs.github.com/en/actions/security-for-github-actions/security-guides/using-secrets-in-github-actions)
- [OWASP: Secrets Management Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html)
- [Gitleaks](https://github.com/gitleaks/gitleaks)

### Arquivos internos do repositório
- `AGENTS.md` — workflow OpenSpec SDD, regra do desktop bridge (OpenBandNative/`@bridge`), constraints de código.
- `.gitignore` — lacuna conhecida: faltar a entrada `.env` (seção 4.3).
- `docs/code-review.md` — revisão anterior do código (notas de segurança e qualidade).
- `src/hooks/usePayment.ts` — pagamento mock atual (sem segredos, 2s delay, 10% de falha).
- `src/data/products.ts` — dados de produto hardcoded (demonstração).
- `scripts/screenshot-compare.js` — único uso atual de `process.env` (`BASE_URL`, `SCREENSHOTS`; não sensível).
- `openspec/changes/` — histórico de especificações (fluxo Propose → Apply → Archive).

---

## 12. 📝 Histórico de Alterações

| Versão | Data | Descrição |
|--------|------|-----------|
| 1.0 | 02/08/2026 | Adaptação inicial para o SmokeBuzz Tabacaria (base: documentação OpenBand v2.0) |

---

> **📌 Documento vivo.** Este documento deve ser revisado sempre que o SmokeBuzz mudar de postura de segurança (adição de backend, pagamento real, Supabase, CI/CD) e a cada rotação de chaves. Qualquer agente de IA que encontre uma divergência entre este documento e a realidade do repositório deve atualizá-lo — ou, no mínimo, abrir uma questão — antes de prosseguir.
