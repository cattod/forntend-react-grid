import typescript from "rollup-plugin-typescript2";
import commonjs from "rollup-plugin-commonjs";
import external from "rollup-plugin-peer-deps-external";
import resolve from "rollup-plugin-node-resolve";
import pkg from "./package.json";
import scss from 'rollup-plugin-scss';

export default {
  entry: 'src/index.tsx',
  dest: 'dist/bundle.js',
  input: "src/index.tsx",
  output:[ {
    file:pkg.main,
    sourcemap: true,
    format: "cjs",
    exports: "named",
  },
  {
    file:pkg.module,
    sourcemap: true,
    format: "cjs",
    exports: "named",
  }
],
  plugins:[
    external(),
    scss(),
    typescript({
      rollupCommonJSResolveHack: true,
      exclude: "**/__tests__/**",
      clean: true
    }),
    commonjs(),

    resolve(),

  ],
  external: ['react', 'react-dom'],
}