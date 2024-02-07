import type { Config } from "@jest/types";

// const baseDir = '<rootDir>/src/app/pass_checker';
// const baseTestDir = '<rootDir>/src/test/pass_checker';
// const baseDir = '<rootDir>/src/app/doubles';
// const baseTestDir = '<rootDir>/src/test/doubles';
const baseDir = "<rootDir>/src/app/server_app";
// const baseTestDir = "<rootDir>/src/test/server_app";
// const baseTestDir = "<rootDir>/src/test/server_app2";
const baseTestDir = "<rootDir>/src/test";

const config: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "node",
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: [
    // '<rootDir>/src/app/**/*.ts'
    `${baseDir}/**/*.ts`,
  ],
  testMatch: [
    `${baseTestDir}/server_app/**/*.test.ts`,
    `${baseTestDir}/server_app2/**/*.test.ts`,
    // `!${baseTestDir}/server_app2/**/*.test.ts`, // `!${testDir}` is how to exclude test paths
  ],
  setupFiles: ["<rootDir>/src/test/server_app3/utils/config.ts"],
};

export default config;
