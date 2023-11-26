const pkg = require('./package.json');
const swc = require('rollup-plugin-swc3');
const swcPreserveDirectives = require('rollup-swc-preserve-directives');

module.exports = {
    input: 'src/index.js',
    output: [{
        file: pkg.main,
        format: 'cjs',
        exports: 'named',
        sourcemap: false,
        strict: false,
    }],
    plugins: [
        swc.swc(),
        swcPreserveDirectives.default(),
    ],
    external: ['react', 'react-dom'],
}
