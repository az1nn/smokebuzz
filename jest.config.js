/** @type {import('jest').Config} */
module.exports = {
  preset: "react-native",
  transformIgnorePatterns: [
    "node_modules/(?!(react-native|@react-native|expo|@expo|nativewind|react-native-reanimated|react-native-safe-area-context|react-native-web|expo-status-bar)/)",
  ],
  transform: {
    "^.+\\.(ts|tsx)$": ["babel-jest", { configFile: "./babel.config.jest.js" }],
    "^.+\\.(js|jsx)$": ["babel-jest", { configFile: "./babel.config.jest.js" }],
  },
  moduleNameMapper: {
    "\\.css$": "<rootDir>/__mocks__/styleMock.js",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};
