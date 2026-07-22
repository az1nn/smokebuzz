const fs = require("fs");
const path = require("path");

const dist = path.join(__dirname, "dist");
const htmlPath = path.join(dist, "index.html");

if (!fs.existsSync(htmlPath)) {
  console.error("dist/index.html not found, skipping post-build");
  process.exit(0);
}

let html = fs.readFileSync(htmlPath, "utf8");

html = html.replace(/<title>.*?<\/title>/, "<title>smokebuzz</title>");

const headTags = [
  `<link rel="manifest" href="/manifest.json" />`,
  `<meta name="theme-color" content="#0284c7" />`,
  `<meta name="apple-mobile-web-app-capable" content="yes" />`,
  `<link rel="apple-touch-icon" href="/assets/icon.png" />`,
];

for (const tag of headTags) {
  if (!html.includes(tag)) {
    html = html.replace("</head>", `  ${tag}\n  </head>`);
  }
}

fs.writeFileSync(htmlPath, html);

const srcManifest = path.join(__dirname, "public", "manifest.json");
if (fs.existsSync(srcManifest)) {
  fs.copyFileSync(srcManifest, path.join(dist, "manifest.json"));
}

console.log("Post-build complete: manifest, meta tags, and title updated");
