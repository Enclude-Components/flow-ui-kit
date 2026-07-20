const { jestConfig } = require('@salesforce/sfdx-lwc-jest/config');

module.exports = {
    ...jestConfig,
    // See jest.resolver.js: works around a one-line bug in sfdx-lwc-jest@8.0.0's bundled resolver
    // while keeping its c/* and lightning/* namespace resolution intact.
    resolver: require.resolve('./jest.resolver.js'),
};
