module.exports = {
    roots: ['<rootDir>/src'],
    transform: {
      '^.+\\.tsx?$': 'ts-jest'
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'node'],
    moduleNameMapper: {
      '\\.(scss|less)$': '<rootDir>/styleMock.js',
    },
    collectCoverage: true,
    clearMocks: true,
    coverageDirectory: "coverage",
  };