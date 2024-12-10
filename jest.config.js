/** @type {import('@jest/types').Config.ProjectConfig} */
module.exports = {
  preset: "jest-expo",
  setupFiles: ["<rootDir>/tests/setup.ts"],
  moduleNameMapper: {
    "^app/(.*)$": "<rootDir>/app/$1",
    "^components/(.*)$": "<rootDir>/components/$1",
    "^hooks/(.*)$": "<rootDir>/hooks/$1",
    "^utils/(.*)$": "<rootDir>/utils/$1",
    "^store/(.*)$": "<rootDir>/store/$1",
    "^i18n/(.*)$": "<rootDir>/i18n/$1",
    "^theme/(.*)$": "<rootDir>/theme/$1",
  },
  transformIgnorePatterns: [
    "node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)",
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    "**/*.{ts,tsx}",
    "!**/coverage/**",
    "!**/node_modules/**",
    "!**/babel.config.js",
    "!**/jest.setup.js",
  ],
  testPathIgnorePatterns: ["/node_modules/", "/e2e/"],
}
