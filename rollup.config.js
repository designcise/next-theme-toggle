const pkg = require('./package.json');
const swc = require('rollup-plugin-swc3');
const swcPreserveDirectives = require('rollup-swc-preserve-directives');

module.exports = {
    input: {
        index: 'src/index.js',
        server: 'src/server.js'
    },
    output: [{
        dir: 'dist/',
        entryFileName: '[name].js',
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
