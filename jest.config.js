/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '\\.(css|scss|sass)$': 'identity-obj-proxy',
  },
  testPathIgnorePatterns: ['/node_modules/', '/.next/'],
  collectCoverage: true,
  collectCoverageFrom: [
    'features/**/*.{ts,tsx}', // Cambia esta ruta por la que tiene tu código fuente
    '!**/node_modules/**',
    '!**/vendor/**',
  ],
  coverageReporters: ['lcov', 'text', 'html'],
};
