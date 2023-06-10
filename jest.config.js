module.exports = {
    testEnvironment: 'node',
    collectCoverage: true,
    collectCoverageFrom: ['**/*.js', '!**/node_modules/**', '!**/coverage/**'],
    coverageDirectory: 'coverage',
};
