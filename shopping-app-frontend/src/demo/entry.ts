// Demo UI entry point. Only demo builds (NEXT_PUBLIC_DEMO_MODE=1) resolve
// "@/demo/entry" to this file; normal builds and tests get ./disabled.ts, so
// none of the demo code or fixtures ship with them (see next.config.mjs).
import DemoShell from "./DemoShell";
import DemoCatalog from "./DemoCatalog";
import { DemoCheckoutNote, DemoOrderPlaced } from "./checkout";
import type { DemoEntry } from "./types";

export const demo: DemoEntry | null = {
	DemoShell,
	DemoCatalog,
	DemoCheckoutNote,
	DemoOrderPlaced,
};
