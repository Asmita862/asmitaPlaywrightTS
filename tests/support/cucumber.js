const browser = process.env.BROWSER || 'browser';
const timestamp = Date.now();

module.exports = {
  default: [
    '--require-module', 'ts-node/register',
    '--require', 'tests/support/world.ts',   // load world first
    '--require', 'tests/support/hooks.ts',   // load hooks second
    '--require', 'tests/steps/**/*.ts',      // then steps
    'tests/features/**/*.feature',           // feature files
    '--retry', 0,
    '--format', `json:reports/cucumber_report.${browser}.${timestamp}.json`,
    '--exit'
  ].join(' '),
  embeddings: [
    {
      mime_type: "image/png",
      data: "./report/artifacts/screenshots/test-scenario.png"
    }
  ],
  worldParameters: {
    fixtures: 'tests/fixtures/**/*.json'
  }
};
