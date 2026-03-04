module.exports = {
  collectCoverageFrom: [
    "**/*.js",
    "**/*.jsx"
  ],
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/coverage/",
    "jest.config.js"
  ],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100
    }
  }
};
