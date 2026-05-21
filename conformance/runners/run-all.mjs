#!/usr/bin/env node
import { evaluateFixture, loadFixture, printReport } from "./lib/fixture-runner.mjs";

const fixtures = [
  new URL("./openclaw/fixture.json", import.meta.url),
  new URL("./openviking/fixture.json", import.meta.url),
  new URL("./gbrain/fixture.json", import.meta.url),
  new URL("./m-flow/fixture.json", import.meta.url),
];

const reports = fixtures.map((fixtureUrl) => evaluateFixture(loadFixture(fixtureUrl)));

for (const report of reports) {
  printReport(report);
}

const blocked = reports.filter((report) => report.overall_status === "BLOCKED").length;
const partial = reports.filter((report) => report.overall_status === "PARTIAL").length;
const passed = reports.filter((report) => report.overall_status === "PASS").length;
const notApplicable = reports.filter((report) => report.overall_status === "NOT_APPLICABLE").length;

console.log(`summary: ${passed} PASS, ${partial} PARTIAL, ${notApplicable} NOT_APPLICABLE, ${blocked} BLOCKED`);

if (blocked > 0) {
  process.exitCode = 1;
}
