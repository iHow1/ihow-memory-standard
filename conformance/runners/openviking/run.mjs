#!/usr/bin/env node
import { main } from "../lib/fixture-runner.mjs";

await main(new URL("./fixture.json", import.meta.url));
