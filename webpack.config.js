const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { DefinePlugin } = require('webpack');

module.exports = {
  mode: 'development',
  entry: './src/index.tsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
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
        test: /\.css$/, // ✅ Добавляем загрузку CSS
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.wasm$/, // FIX: WebAssembly
        type: 'javascript/auto',
        loader: 'file-loader',
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|xml)$/, // FIX: ассеты Cesium
        loader: 'file-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: "public", to: ".", globOptions: { ignore: ["**/index.html"] }  },
        { from: 'node_modules/cesium/Build/Cesium', to: 'cesium' }
      ],
    }),
    new DefinePlugin({
      CESIUM_BASE_URL: JSON.stringify("/cesium"),
    }),
  ],
  devServer: {
    static: path.join(__dirname, 'public'),
    port: 3000,
  },
  experiments: {
    asyncWebAssembly: true, // FIX: Разрешаем WebAssembly
    syncWebAssembly: true,
  },
};
