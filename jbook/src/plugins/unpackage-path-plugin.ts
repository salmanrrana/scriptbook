import * as esbuild from 'esbuild-wasm';
import axios from 'axios';

export const unpkgPathPlugin = () => {
  return {
    name: 'unpkg-path-plugin',
    setup(build: esbuild.PluginBuild) {
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        console.log('onResovle', args);

        if (args.path === 'index.js') {
          return { path: args.path, namespace: 'a' };
        }

        // this is for the instances when there are
        // require/import statements in the index.js file
        if (args.path.includes('./') || args.path.includes('../')) {
          // by adding in the + '/', it adds a forward slash at the end of the url
          // making it use the importer as the base of the url
          return {
            namespace: 'a',
            path: new URL(args.path, 'https://unpkg.com' + args.resolveDir + '/').href
          };
        }

        return {
          namespace: 'a',
          path: `https://unpkg.com/${args.path}`
        };
      });

      build.onLoad({ filter: /.*/ }, async (args: any) => {
        console.log('onLoad', args);

        if (args.path === 'index.js') {
          return {
            loader: 'jsx',
            contents: `
              import React from 'react';
              console.log(React);
            `,
          };
        }

        const { data, request } = await axios.get(args.path);
        return {
          loader: 'jsx',
          contents: data,
          // this is how we can find out if we have been redirected
          // to a different url from our original request
          resolveDir: new URL('./', request.responseURL).pathname
        };
      });
    },
  };
};
