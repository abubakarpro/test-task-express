module.exports = {
  moduleFileExtensions: ['js'],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.js$',
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['src/**/*.js'],
  coverageReporters: ['lcov', 'text', 'html'],
};