/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testTimeout: 15000,
  testEnvironment: "node",
  testMatch: ["**/*.test.ts"],
  transform: {
    "^.+\.tsx?$": ["ts-jest",{}],
  },
};
