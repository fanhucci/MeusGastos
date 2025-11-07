module.exports = {
  preset: 'jest-expo',

  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],

  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },

  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@react-native|@react-native-community|@testing-library|expo(nent)?|@expo(nent)?|@unimodules|unimodules|sentry-expo|native-base|react-clone-referenced-element)',
  ],

  testPathIgnorePatterns: ['/node_modules/', '/android/', '/ios/'],

  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
};
