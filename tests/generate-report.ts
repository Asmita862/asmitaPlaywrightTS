import * as reporter from "cucumber-html-reporter";
import * as fs from "fs";
import * as path from "path";

// Path to the reports directory
const reportsDir = path.join(__dirname, "../reports");

// Get all JSON files in the reports directory
const jsonFiles: string[] = fs.readdirSync(reportsDir).filter((f: string) => f.endsWith(".json"));

// Pick the latest JSON file
const jsonFile = jsonFiles.sort().pop();

if (!jsonFile) {
  console.error("No JSON report found in reports folder.");
  process.exit(1);
}

// Generate HTML report
reporter.generate({
  theme: "bootstrap",
  jsonFile: path.join(reportsDir, jsonFile),
  output: path.join(reportsDir, "cucumber_report.html"),
  reportSuiteAsScenarios: true,
  launchReport: true,
  metadata: {
    Browser: "Playwright",
    Platform: process.platform,
  },
});

console.log(`HTML report generated: ${path.join(reportsDir, "cucumber_report.html")}`);
