import { playAudit } from "playwright-lighthouse";

export async function runAudit(page, reportname) {
  const currentUrl = await page.url();
  const reportDirectory = "./lighthouse-report";
  const reportFilename = reportname;
  await page.waitForTimeout(3000);
  const auditResults = await playAudit({
    url: currentUrl,
    thresholds: {
      accessibility: 100,
    },
    port: 9223,
    ignoreError: true,
    reports: {
      formats: {
        json: false,
        html: true,
        csv: false,
      },
      directory: reportDirectory,
      name: reportFilename,
    },
  });
  await page.waitForTimeout(3000);
  console.log(auditResults.comparisonError, "\n");
}
