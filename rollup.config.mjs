import { swc } from 'rollup-plugin-swc3';
import swcPreserveDirectives from 'rollup-swc-preserve-directives';
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
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
        swc(),
        swcPreserveDirectives(),
        nodeResolve({
            extensions: ['.js'],
            mainFields: ['exports', 'main'],
        }),
    ],
    external: ['react', 'react-dom'],
}
