import { chromium } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const url = process.argv[2] || 'http://127.0.0.1:3000/website/demo';
const outDir = path.resolve('.artifacts', 'visual');

const viewports = [
  { name: 'desktop', width: 1440, height: 1200 },
  { name: 'mobile', width: 390, height: 1000 },
];

async function launchBrowser() {
  try {
    return await chromium.launch({ channel: 'chrome' });
  } catch {
    return chromium.launch();
  }
}

await mkdir(outDir, { recursive: true });

const browser = await launchBrowser();
const results = [];

try {
  for (const viewport of viewports) {
    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height },
      reducedMotion: 'reduce',
    });
    const page = await context.newPage();
    const consoleErrors = [];

    page.on('console', (message) => {
      if (message.type() === 'error') {
        consoleErrors.push(message.text());
      }
    });
    page.on('pageerror', (error) => {
      consoleErrors.push(error.message);
    });

    const response = await page.goto(url, { waitUntil: 'networkidle' });
    const status = response?.status() ?? 0;
    const hasContent = (await page.locator('body').innerText()).trim().length > 0;
    const hasNextOverlay = await page.locator('[data-nextjs-dialog]').count();
    const screenshotPath = path.join(outDir, `${viewport.name}.png`);

    await page.screenshot({ path: screenshotPath, fullPage: false });
    await context.close();

    results.push({
      viewport: viewport.name,
      status,
      hasContent,
      hasNextOverlay: hasNextOverlay > 0,
      consoleErrors,
      screenshotPath,
    });
  }
} finally {
  await browser.close();
}

const reportPath = path.join(outDir, 'report.json');
await writeFile(reportPath, JSON.stringify({ url, results }, null, 2));

const failed = results.some(
  (result) =>
    result.status >= 400 ||
    !result.hasContent ||
    result.hasNextOverlay ||
    result.consoleErrors.length > 0
);

console.log(JSON.stringify({ url, reportPath, results }, null, 2));

if (failed) {
  process.exitCode = 1;
}
