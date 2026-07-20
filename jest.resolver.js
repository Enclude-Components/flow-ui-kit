// @salesforce/sfdx-lwc-jest@8.0.0's bundled resolver.js special-cases the bare 'lwc' specifier as
// `require.resolve('@lwc/engine-dom')`, which follows that package's "main" field — the ESM-only
// dist/index.js — instead of the CJS dist/index.cjs build that sits right next to it. Everything
// else about that resolver (c/* and lightning/* namespace mapping) is correct, so delegate to it
// and only patch the one broken case.
const sfdxLwcJestResolver = require(require.resolve('@salesforce/sfdx-lwc-jest/src/resolver.js'));

module.exports = function (modulePath, options) {
    if (modulePath === 'lwc') {
        return require.resolve('@lwc/engine-dom/dist/index.cjs');
    }
    return sfdxLwcJestResolver(modulePath, options);
};
