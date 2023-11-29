const pkg = require('./package.json');
const swc = require('rollup-plugin-swc3');
const swcPreserveDirectives = require('rollup-swc-preserve-directives');
const resolve = require('@rollup/plugin-node-resolve');

module.exports = {
    input: {
        client: 'src/client.js',
        server: 'src/server.js'
    },
    output: [{
        dir: 'dist/',
        entryFileNames: '[name].js',
        format: 'esm',
        exports: 'named',
        sourcemap: false,
        strict: false,
    }],
    plugins: [
        swc.swc(),
        swcPreserveDirectives.default(),
        resolve({
            extensions: ['.js'],
            mainFields: ['exports', 'main'],
        }),
    ],
    external: ['react', 'react-dom'],
}
