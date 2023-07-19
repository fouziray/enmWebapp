const VitePlugin = require('vite-plugin-react');
const tailwindcssPlugin = require('tailwindcss');
const autoprefixerplugin = require('autoprefixer');
module.exports = {
  webpack: {},
  plugins: [
    {
      plugin: VitePlugin,
      plugin: tailwindcssPlugin,
      plugin: autoprefixerplugin,
      // Optional: Specify the path to the Vite configuration file.
      // If not specified, the default Vite configuration file will be used.
      // viteConfigFile: 'vite.config.js',
    },
  ],
};