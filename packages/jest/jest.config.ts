/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  testEnvironment: "jsdom",
  extensionsToTreatAsEsm: ['.ts'],
  verbose: true,
  transform: {
    // '^.+\\.[tj]sx?$' to process js/ts with `ts-jest`
    // '^.+\\.m?[tj]sx?$' to process js/ts/mjs/mts with `ts-jest`
    "^.+\\.[tj]s$": "babel-jest",
  },
  transformIgnorePatterns: [
    "node_modules/(?!lodash-es)"
  ],
  collectCoverage: true,
  moduleDirectories: ["node_modules"]
};