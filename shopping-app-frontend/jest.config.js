// eslint-disable-next-line @typescript-eslint/no-require-imports -- CommonJS config file
const nextJest = require("next/jest");

const createJestConfig = nextJest({ dir: "./" });

module.exports = createJestConfig({
	testEnvironment: "jsdom",
	setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
	moduleNameMapper: {
		"^@/demo/entry$": "<rootDir>/src/demo/disabled.ts",
		"^@/(.*)$": "<rootDir>/src/$1",
	},
});
