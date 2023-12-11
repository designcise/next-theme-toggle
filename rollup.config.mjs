import { swc } from 'rollup-plugin-swc3'
import swcPreserveDirectives from 'rollup-swc-preserve-directives'
import { nodeResolve } from '@rollup/plugin-node-resolve'

export default {
  input: {
    client: 'src/client.ts',
    server: 'src/server.ts',
  },
  output: [
    {
      dir: 'dist/',
      entryFileNames: '[name].ts',
      format: 'esm',
      exports: 'named',
      sourcemap: false,
      strict: false,
    },
  ],
  plugins: [
    swc(),
    swcPreserveDirectives(),
    nodeResolve({
      extensions: ['.js', '.ts'],
      mainFields: ['exports', 'main'],
    }),
  ],
  external: ['react', 'react-dom'],
}
