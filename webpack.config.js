const path = require('path');
const CompressionPlugin = require("compression-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");


module.exports = {
  mode: 'development',
  stats: 'none',
  // optimization: {
  //   minimize: true,
  //   minimizer: [new TerserPlugin()],
  // },
  devtool: 'inline-source-map',
  entry: path.join(__dirname, 'src', 'index.tsx'),
  devServer: {
    static: {
        directory: path.resolve(__dirname, 'src'),
        publicPath: '/',
    },
    proxy: {
      '/puzzle': 'http://localhost:3000'
    },
    port: 8080,
    hot: true,
    liveReload: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: [
            "style-loader",
            "css-loader"
        ],
        exclude: /node_modules/,
    }
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  plugins: [
    // new CompressionPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, './public', 'index.html')
    })
  ],
};
