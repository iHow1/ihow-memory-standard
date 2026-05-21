import fs from "node:fs";

const VALID_STATUS = new Set(["PASS", "PARTIAL", "NOT_APPLICABLE", "BLOCKED"]);

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function readJson(url) {
  return JSON.parse(fs.readFileSync(url, "utf-8"));
}

function validateScenario(scenario) {
  assert(typeof scenario.id === "string" && scenario.id.length > 0, "scenario.id is required");
  assert(typeof scenario.title === "string" && scenario.title.length > 0, `${scenario.id}: title is required`);
  assert(VALID_STATUS.has(scenario.status), `${scenario.id}: invalid status ${scenario.status}`);
  assert(Array.isArray(scenario.checks), `${scenario.id}: checks must be an array`);
  assert(Array.isArray(scenario.evidence), `${scenario.id}: evidence must be an array`);
  assert(Array.isArray(scenario.gaps), `${scenario.id}: gaps must be an array`);

  for (const check of scenario.checks) {
    assert(typeof check.name === "string" && check.name.length > 0, `${scenario.id}: check.name is required`);
    assert(typeof check.ok === "boolean", `${scenario.id}: check.ok must be boolean`);
  }

  const passedChecks = scenario.checks.filter((check) => check.ok).length;
  const failedChecks = scenario.checks.length - passedChecks;

  if (scenario.status === "PASS") {
    assert(failedChecks === 0, `${scenario.id}: PASS cannot contain failed checks`);
  }
  if (scenario.status === "PARTIAL") {
    assert(passedChecks > 0, `${scenario.id}: PARTIAL needs at least one passed check`);
    assert(scenario.gaps.length > 0 || failedChecks > 0, `${scenario.id}: PARTIAL must name gaps`);
  }
  if (scenario.status === "NOT_APPLICABLE") {
    assert(scenario.gaps.length > 0, `${scenario.id}: NOT_APPLICABLE must explain why`);
  }
  if (scenario.status === "BLOCKED") {
    assert(scenario.gaps.length > 0, `${scenario.id}: BLOCKED must explain the blocker`);
  }

  return {
    id: scenario.id,
    title: scenario.title,
    status: scenario.status,
    passed_checks: passedChecks,
    total_checks: scenario.checks.length,
    evidence: scenario.evidence,
    gaps: scenario.gaps,
  };
}

function overallStatus(scenarios) {
  if (scenarios.some((scenario) => scenario.status === "BLOCKED")) {
    return "BLOCKED";
  }
  if (scenarios.length > 0 && scenarios.every((scenario) => scenario.status === "PASS")) {
    return "PASS";
  }
  if (scenarios.length > 0 && scenarios.every((scenario) => scenario.status === "NOT_APPLICABLE")) {
    return "NOT_APPLICABLE";
  }
  return "PARTIAL";
}

export function loadFixture(url) {
  return readJson(url);
}

export function evaluateFixture(fixture) {
  assert(typeof fixture.runtime === "string" && fixture.runtime.length > 0, "runtime is required");
  assert(typeof fixture.label === "string" && fixture.label.length > 0, "label is required");
  assert(Array.isArray(fixture.scenarios), "scenarios must be an array");
  assert(fixture.scenarios.length > 0, "at least one scenario is required");
  assert(fixture.policy?.public_fixture === true, `${fixture.runtime}: fixture must be public-safe`);
  assert(fixture.policy?.uses_synthetic_data === true, `${fixture.runtime}: fixture must use synthetic data`);
  assert(
    fixture.policy?.no_official_conformance_claim === true,
    `${fixture.runtime}: external runner must avoid official conformance claims`,
  );

  const scenarios = fixture.scenarios.map(validateScenario);
  return {
    runtime: fixture.runtime,
    label: fixture.label,
    classification: fixture.classification ?? "experimental",
    references: fixture.references ?? [],
    overall_status: overallStatus(scenarios),
    scenarios,
  };
}

export function printReport(report) {
  console.log(`${report.overall_status} ${report.runtime} - ${report.label}`);
  for (const scenario of report.scenarios) {
    console.log(
      `  ${scenario.status} ${scenario.id} ${scenario.title} (${scenario.passed_checks}/${scenario.total_checks} checks)`,
    );
    for (const gap of scenario.gaps) {
      console.log(`    gap: ${gap}`);
    }
  }
}

export async function main(fixtureUrl) {
  const report = evaluateFixture(loadFixture(fixtureUrl));
  printReport(report);
  if (report.overall_status === "BLOCKED") {
    process.exitCode = 1;
  }
  return report;
}
