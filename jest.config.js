/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1', // ✅ Esto permite usar @/ como alias
    '\\.(css|scss|sass)$': 'identity-obj-proxy',
  },
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'], // Puedes descomentarlo si lo necesitas más adelante
  testPathIgnorePatterns: ['/node_modules/', '/.next/'],
};
