/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  transform: {
    // '^.+\\.[tj]sx?$' to process js/ts with `ts-jest`
    // '^.+\\.m?[tj]sx?$' to process js/ts/mjs/mts with `ts-jest`
    "^.+\\.js$": "babel-jest",
    '^.+\\.tsx?$': "ts-jest",
  },
  moduleNameMapper: {
    "lodash-es": "lodash"
  },
  collectCoverage: true
};