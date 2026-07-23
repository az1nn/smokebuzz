const { Jimp } = require("jimp");
const fs = require("fs");
const path = require("path");

const ASSETS = path.resolve(__dirname, "..", "assets");

const TARGETS = [
  { name: "logosmokebuzz-transparent.png", max: 310 },
  { name: "piteira_longa_girls_in_green.png", max: 300 },
  { name: "piteira_tradicional_papelito.png", max: 300 },
  { name: "seda_zomo_branca.png", max: 300 },
  { name: "seda_zomo_marrom_natural.png", max: 300 },
];

async function main() {
  for (const t of TARGETS) {
    const fp = path.join(ASSETS, t.name);
    if (!fs.existsSync(fp)) {
      console.log(`SKIP ${t.name} — not found`);
      continue;
    }
    const beforeStat = await fs.promises.stat(fp);
    const beforeBytes = beforeStat.size;
    const img = await Jimp.read(fp);
    const w = img.bitmap.width;
    const h = img.bitmap.height;
    const scale = Math.min(t.max / w, t.max / h, 1);
    const nw = Math.round(w * scale);
    const nh = Math.round(h * scale);
    if (scale >= 1) {
      console.log(`SKIP ${t.name} — already ≤ ${t.max}px (${w}×${h})`);
      continue;
    }
    img.resize({ w: nw, h: nh });
    await img.write(fp);
    const afterStat = await fs.promises.stat(fp);
    console.log(
      `OK   ${t.name}  ${w}×${h} → ${nw}×${nh}  (${(beforeBytes / 1024).toFixed(0)} KB → ${(afterStat.size / 1024).toFixed(0)} KB)`
    );
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
