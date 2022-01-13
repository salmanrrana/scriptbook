import * as esbuild from 'esbuild-wasm';
import { unpkgPathPlugin } from '../plugins/unpackage-path-plugin';
import { fetchPlugin } from '../plugins/fetch-plugin';

let service: esbuild.Service;

export const bundle = async (rawCode: string) => {
  if (!service) {
    service = await esbuild.startService({
      worker: true,
      wasmURL: 'https:unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm'
    });
  }

  // this is the bundling process
  const result = await service.build({
    entryPoints: ['index.js'],
    bundle: true,
    write: false,
    plugins: [unpkgPathPlugin(), fetchPlugin(rawCode)],
    define: {
      // we need to make sure that we are passing a string of production so we wrap
      // production in an extra set of quotes
      'process.env.NODE_ENV': '"production"',
      // some packages will reference "global" so this will
      // define global so we can run it locally and avoid errors
      global: 'window'
    }
  });

  return result.outputFiles[0].text;
};
