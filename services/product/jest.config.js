const path = require('path');

const servicesDir = path.resolve(__dirname, './');
module.exports = {
    roots: [
        servicesDir
    ],
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(ts?|tsx?)$',
    moduleFileExtensions: [
        'ts',
        'tsx',
        'js',
        'jsx',
        'json'
    ],
    modulePathIgnorePatterns: [
        '/node_modules/',
        '.*__mocks__.*',
    ],
};
