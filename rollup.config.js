const pkg = require('./package.json');

const banner = `/*!
 * @license
 * ` + pkg.name + `
 * https://xd.gov/
 * Version: ` + pkg.version + `
 *
 * This project, excluding its dependencies, is in the worldwide public domain.
 * Released under the CC0 1.0 Universal public domain dedication.
 * https://github.com/XDgov/chartjs-plugin-us-error-bars/blob/master/LICENSE.md
 */`;

export default {
  input: 'src/plugin.js',
  banner: banner,
  format: 'umd',
  external: [
    'chart.js'
  ],
  globals: {
    'chart.js': 'Chart'
  },
  output: {
    file: 'dist/plugin.js',
    format: 'umd',
    name: 'Test123',
    sourcemap: true
  }
};