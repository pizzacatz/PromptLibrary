module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  projects: [
    {
      displayName: 'root',
      testMatch: ['<rootDir>/__tests__/**/*.test.{js,ts}']
    },
    {
      displayName: 'frontend',
      testEnvironment: 'jsdom',
      testMatch: ['<rootDir>/frontend/__tests__/**/*.test.{js,ts,tsx}'],
      transform: {
        '^.+\\.(ts|tsx)$': [
          'ts-jest',
          {
            tsconfig: '<rootDir>/frontend/tsconfig.json'
          }
        ]
      },
      moduleNameMapper: {
        '^@frontend/(.*)$': '<rootDir>/frontend/src/$1',
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
      }
    },
    {
      displayName: 'backend',
      testMatch: ['<rootDir>/backend/__tests__/**/*.test.{js,ts}'],
      transform: {
        '^.+\\.(ts)$': [
          'ts-jest',
          {
            tsconfig: '<rootDir>/backend/tsconfig.json'
          }
        ]
      },
      moduleNameMapper: {
        '^@backend/(.*)$': '<rootDir>/backend/src/$1'
      }
    }
  ],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov'],
  collectCoverageFrom: [
    'frontend/src/**/*.{ts,tsx}',
    'backend/src/**/*.ts',
    '!**/*.d.ts',
    '!**/node_modules/**'
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node']
}; 