// Generates the CV PDF from the built homepage, so the PDF never drifts from cv.ts.
//
// Usage:
//   node scripts/generate-pdf.mjs                      -> public/joao-cunha-cv.pdf
//   node scripts/generate-pdf.mjs --out dist/cv.pdf    -> custom output path
//
// It expects the site to be built already (dist/), and serves it with Astro's preview server.

import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { preview } from 'astro';
import { chromium } from 'playwright';

const outFlag = process.argv.indexOf('--out');
const outPath = path.resolve(
  outFlag > -1 ? process.argv[outFlag + 1] : 'public/joao-cunha-cv.pdf',
);

const server = await preview({ root: process.cwd(), logLevel: 'error' });
let browser;

try {
  browser = await chromium.launch();
  const page = await browser.newPage();

  // Always render the light, print version, whatever the machine's settings are.
  await page.emulateMedia({ media: 'print', colorScheme: 'light' });
  await page.goto(`http://localhost:${server.port}/`, {
    waitUntil: 'networkidle',
  });

  await mkdir(path.dirname(outPath), { recursive: true });
  await page.pdf({
    path: outPath,
    printBackground: true,
    preferCSSPageSize: true, // uses the @page size and margins from the stylesheet
  });

  console.log(`PDF written to ${path.relative(process.cwd(), outPath)}`);
} finally {
  await browser?.close();
  await server.stop();
}
