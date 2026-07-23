const fs = require("fs");

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";
const OUT_DIR = process.env.SCREENSHOTS || "screenshots";

const SCREENS = [
  { name: "home", route: "/" },
  { name: "products", route: "/products" },
  { name: "cart", route: "/cart" },
  { name: "checkout", route: "/checkout" },
];

async function main() {
  let puppeteer;
  try {
    puppeteer = require("puppeteer-core");
  } catch {
    try {
      puppeteer = require("puppeteer");
    } catch {
      console.error(
        "puppeteer not found. Install it:\n" +
          "  npm install --save-dev puppeteer-core\n" +
          "Then point PUPPETEER_EXECUTABLE_PATH at your Chrome binary, or\n" +
          "install full puppeteer which bundles Chromium:\n" +
          "  npm install --save-dev puppeteer"
      );
      process.exit(1);
    }
  }

  fs.mkdirSync(OUT_DIR, { recursive: true });

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();

  try {
    await page.setViewport({ width: 390, height: 844 });
    for (const screen of SCREENS) {
      const url = `${BASE_URL}${screen.route}`;
      console.log(`Capturing: ${url}`);
      try {
        await page.goto(url, { waitUntil: "networkidle0", timeout: 15000 });
        await page.screenshot({
          path: `${OUT_DIR}/${screen.name}.png`,
          fullPage: true,
        });
        console.log(`  OK → ${OUT_DIR}/${screen.name}.png`);
      } catch (e) {
        console.error(`  FAIL ${url}: ${e.message}`);
      }
    }

    await page.setViewport({ width: 1440, height: 900 });
    for (const screen of SCREENS) {
      const url = `${BASE_URL}${screen.route}`;
      console.log(`Capturing (desktop): ${url}`);
      try {
        await page.goto(url, { waitUntil: "networkidle0", timeout: 15000 });
        await page.screenshot({
          path: `${OUT_DIR}/${screen.name}-desktop.png`,
          fullPage: true,
        });
        console.log(`  OK → ${OUT_DIR}/${screen.name}-desktop.png`);
      } catch (e) {
        console.error(`  FAIL ${url}: ${e.message}`);
      }
    }
  } finally {
    await browser.close();
  }

  console.log("\nDone. Compare screenshots in", OUT_DIR);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
