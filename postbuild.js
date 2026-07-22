const fs = require("fs");
const path = require("path");
const zlib = require("zlib");

const dist = path.join(__dirname, "dist");

// Minimal PNG generator
function createPNG(width, height, r, g, b) {
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  function chunk(type, data) {
    const len = Buffer.alloc(4);
    len.writeUInt32BE(data.length);
    const typeB = Buffer.from(type, "ascii");
    const crcB = Buffer.alloc(4);
    crcB.writeUInt32BE(crc32(Buffer.concat([typeB, data])));
    return Buffer.concat([len, typeB, data, crcB]);
  }

  function crc32(buf) {
    let crc = 0xffffffff;
    for (let i = 0; i < buf.length; i++) {
      crc ^= buf[i];
      for (let j = 0; j < 8; j++) crc = (crc >>> 1) ^ (crc & 1 ? 0xedb88320 : 0);
    }
    return (crc ^ 0xffffffff) >>> 0;
  }

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;
  ihdr[9] = 6; // RGBA
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;

  const raw = Buffer.alloc(height * (1 + width * 4));
  for (let y = 0; y < height; y++) {
    raw[y * (1 + width * 4)] = 0;
    for (let x = 0; x < width; x++) {
      const o = y * (1 + width * 4) + 1 + x * 4;
      raw[o] = r;
      raw[o + 1] = g;
      raw[o + 2] = b;
      raw[o + 3] = 255;
    }
  }

  return Buffer.concat([
    signature,
    chunk("IHDR", ihdr),
    chunk("IDAT", zlib.deflateSync(raw)),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

// Read generated HTML to extract bundles
const generatedHtml = fs.readFileSync(path.join(dist, "index.html"), "utf8");

const cssMatch = generatedHtml.match(
  /<link rel="stylesheet" href="([^"]+\.css)"/
);
const jsMatch = generatedHtml.match(/<script src="([^"]+\.js)" defer/);
const cssBundle = cssMatch ? cssMatch[1] : null;
const jsBundle = jsMatch ? jsMatch[1] : null;

// Write our HTML template with bundles injected
let html = `<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
    <meta name="theme-color" content="#0f172a" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
    <meta name="mobile-web-app-capable" content="yes" />
    <title>smokebuzz</title>
    <link rel="icon" href="/favicon.ico" sizes="any" />
    <link rel="icon" href="/icon-192.png" type="image/png" />
    <link rel="apple-touch-icon" href="/icon-192.png" />
    <link rel="manifest" href="/manifest.json" />
    <style id="app-reset">
      *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
      html,body{height:100%;width:100%}
      body{overflow:hidden;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#0f172a;color:#e2e8f0}
      #root{display:flex;height:100%;width:100%}
      .loading{display:flex;height:100%;width:100%;align-items:center;justify-content:center;flex-direction:column;gap:1rem}
      .loading::after{content:'';width:2rem;height:2rem;border:3px solid #334155;border-top-color:#38bdf8;border-radius:50%;animation:spin .8s linear infinite}
      @keyframes spin{to{transform:rotate(360deg)}}
    </style>
    ${cssBundle ? `<link rel="stylesheet" href="${cssBundle}" />` : ""}
  </head>
  <body>
    <div id="root">
      <div class="loading"><span>Carregando smokebuzz...</span></div>
    </div>
    <noscript>
      <div style="display:flex;height:100%;width:100%;align-items:center;justify-content:center;flex-direction:column;gap:1rem;padding:2rem;text-align:center;background:#0f172a;color:#e2e8f0">
        <span style="font-size:3rem">⚡</span>
        <h1 style="font-size:1.5rem">smokebuzz</h1>
        <p>This app requires JavaScript to run.</p>
        <p style="color:#64748b;font-size:.875rem">Ative o JavaScript no seu navegador e recarregue a página.</p>
      </div>
    </noscript>
    ${jsBundle ? `<script src="${jsBundle}" defer></script>` : ""}
  </body>
</html>`;

fs.writeFileSync(path.join(dist, "index.html"), html);
console.log("Post-build: index.html written");

// Copy/create icons
if (!fs.existsSync(path.join(dist, "icon-192.png"))) {
  fs.writeFileSync(path.join(dist, "icon-192.png"), createPNG(192, 192, 2, 132, 199));
}
if (!fs.existsSync(path.join(dist, "icon-512.png"))) {
  fs.writeFileSync(path.join(dist, "icon-512.png"), createPNG(512, 512, 2, 132, 199));
}

// Copy manifest
const srcManifest = path.join(__dirname, "public", "manifest.json");
if (fs.existsSync(srcManifest)) {
  fs.copyFileSync(srcManifest, path.join(dist, "manifest.json"));
}

console.log("Post-build: icons + manifest copied");
