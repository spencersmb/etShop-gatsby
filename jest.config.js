module.exports = {
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    "^.+\\.jsx?$": "<rootDir>/jest-preprocess.js",
  },
  testRegex: "(/__tests__/.*\\.([tj]sx?)|(\\.|/)(test|spec))\\.([tj]sx?)$",
  "moduleDirectories": [
    "src",
    "__mocks__",
    "node_modules"
  ],
  moduleNameMapper: {
    "^@components(.*)$": "<rootDir>/src/components$1",
    "^@et/types(.*)$": "<rootDir>/src/types$1",
    "^@redux(.*)$": "<rootDir>/src/state$1",
    "^@svg(.*)$": "<rootDir>/src/assets/svg.ts",
    "^@utils(.*)$": "<rootDir>/src/utils$1",
    ".+\\.(css|styl|less|sass|scss)$": "identity-obj-proxy",
    ".+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/__mocks__/file-mock.js",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  testPathIgnorePatterns: ["node_modules", ".cache"],
  transformIgnorePatterns: ["node_modules/(?!(gatsby)/)"],
  globals: {
    __PATH_PREFIX__: "",
    'ts-jest': {
      diagnostics: false
    }
  },
  testURL: "http://localhost",
  setupFiles: ["<rootDir>/loadershim.js"],
  collectCoverageFrom: [
    "src/**/**/*.{ts,tsx}",
    "!src/pages/**/*.{ts,tsx}",
    "!src/state/reduxTestUtils.tsx",
    "!src/Button/**/*.{ts,tsx}",
    "!/node_modules/",
    "!/docs/",
    "!/plugins/",
    "!/public/",
    "!/__mocks__/",
    "!/.storybook/",
    "!/.cache/",
  ]
}