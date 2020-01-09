module.exports = {
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    "^.+\\.jsx?$": "<rootDir>/jest-preprocess.js"
  },
  testRegex: "(/__tests__/.*\\.([tj]sx?)|(\\.|/)(test|spec))\\.([tj]sx?)$",
  "moduleDirectories": [
    "src",
    "__mocks__",
    "node_modules"
  ],
  moduleNameMapper: {
    "^@api(.*)$": "<rootDir>/src/api$1",
    "^@components(.*)$": "<rootDir>/src/components$1",
    "^@et/types(.*)$": "<rootDir>/src/types$1",
    "^@redux(.*)$": "<rootDir>/src/state$1",
    "^@styles(.*)$": "<rootDir>/src/styles$1",
    "^@svg(.*)$": "<rootDir>/src/assets/svg.ts",
    "^@utils(.*)$": "<rootDir>/src/utils$1",
    ".+\\.(css|styl|less|sass|scss)$": "identity-obj-proxy",
    ".+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/__mocks__/file-mock.js"
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  testPathIgnorePatterns: ["node_modules", ".cache"],
  transformIgnorePatterns: [
    "node_modules/(?!(gatsby-wpgraphql-inline-images))"
  ],
  globals: {
    __PATH_PREFIX__: "",
    "ts-jest": {
      diagnostics: false
    }
  },
  testURL: "http://localhost",
  setupFiles: [
    "<rootDir>/loadershim.js"
  ],
  setupFilesAfterEnv: ["<rootDir>/jest/testHelper.js"],
  collectCoverageFrom: [
    "src/**/**/*.{ts,tsx}",
    "!src/pages/**/*.{ts,tsx}",
    "!src/api/**/*.{ts,tsx}",
    "!src/state/reduxTestUtils.tsx",
    "!src/components/stripe/**/*.{ts,tsx}",
    "!src/utils/apiUtils.ts",
    "!src/utils/stateUtils.ts",
    "!src/utils/windowUtils.ts",
    "!src/styles/**/*.{ts,tsx}",
    "!src/Button/**/*.{ts,tsx}",
    "!/node_modules/",
    "!/docs/",
    "!/plugins/",
    "!/public/",
    "!/__mocks__/",
    "!/.storybook/",
    "!/.cache/"
  ]
}
