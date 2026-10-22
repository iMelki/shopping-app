// Builds the backend-free demo into out-demo/ (cross-platform, no shell env syntax).
import { spawnSync } from "node:child_process";
import { rmSync } from "node:fs";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
rmSync(new URL("../out-demo", import.meta.url), { recursive: true, force: true });

const result = spawnSync(process.execPath, [require.resolve("next/dist/bin/next"), "build"], {
  stdio: "inherit",
  env: { ...process.env, NEXT_PUBLIC_DEMO_MODE: "1", NEXT_TELEMETRY_DISABLED: "1" },
});
process.exit(result.status ?? 1);
