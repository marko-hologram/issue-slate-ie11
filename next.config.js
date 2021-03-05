const withTranspileModules = require('next-transpile-modules')(['slate', 'slate-react']);
const withPlugins = require('next-compose-plugins');

module.exports = withPlugins([[withTranspileModules]]);
