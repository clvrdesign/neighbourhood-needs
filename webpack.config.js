import path,{ resolve } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
// const TerserPlugin = require('terser-webpack-plugin');

export const entry = ['./src/index.js'];
export const output = {
  filename: 'main.min.js',
  path: resolve(__dirname, 'UMD'),

  library: {
    type: 'umd',
  },
  // prevent error: `Uncaught ReferenceError: self is not defined`
  globalObject: 'this',
};
export const mode = 'production';
export const watch = true;
