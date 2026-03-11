import { chromium } from 'playwright';

const browser = await chromium.launch({
  headless: true,
  executablePath: '/root/.cache/ms-playwright/chromium_headless_shell-1194/chrome-linux/headless_shell',
  args: [
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--disable-gpu',
    '--disable-dev-shm-usage',
    '--disable-software-rasterizer',
    '--single-process',
  ]
});
const page = await browser.newPage();
await page.setViewportSize({ width: 960, height: 720 });

await page.goto('http://localhost:5174/', { waitUntil: 'networkidle', timeout: 30000 });
await page.waitForTimeout(3000);

console.log('Taking screenshots of 16 slides...');

for (let i = 0; i < 16; i++) {
  const filename = `/home/user/weekly-report-generator/output/slide-${String(i + 1).padStart(2, '0')}.png`;
  await page.screenshot({ path: filename, fullPage: false });
  console.log(`Slide ${i + 1} saved`);

  // Click the Next button
  if (i < 15) {
    const nextBtn = await page.$('button:has-text("Next")');
    if (nextBtn) {
      await nextBtn.click();
      await page.waitForTimeout(800);
    }
  }
}

await browser.close();
console.log('Done!');
