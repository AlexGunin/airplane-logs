const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { DefinePlugin } = require('webpack');

module.exports = (env, argv) => {
  const isProd = argv.mode === 'production';
  const publicPath = isProd ? "/airplane-logs/" : "/"

  return {
    mode: argv.mode,
    entry: './src/index.tsx',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
      publicPath
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.wasm$/,
          type: 'javascript/auto',
          loader: 'file-loader',
        },
        {
          test: /\.(png|jpg|jpeg|gif|svg|xml)$/,
          loader: 'file-loader',
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: 'public/index.html',
        publicPath
      }),
      new CopyWebpackPlugin({
        patterns: [
          { from: "public", to: ".", globOptions: { ignore: ["**/index.html"] }  },
          { from: 'node_modules/cesium/Build/Cesium', to: 'cesium' }
        ],
      }),
      new DefinePlugin({
        CESIUM_BASE_URL: JSON.stringify(`${publicPath}cesium`),
        ASSETS_PUBLIC_PATH: JSON.stringify(publicPath),
      }),
    ],
    devServer: {
      static: path.join(__dirname, 'public'),
      port: 3000,
    },
    experiments: {
      asyncWebAssembly: true,
      syncWebAssembly: true,
    },
  }
};
