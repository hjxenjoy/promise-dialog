const path = require('path')
// const MiniCssExtractPlugin = require('mini-css-extract-plugin')

// https://itnext.io/how-to-package-your-react-component-for-distribution-via-npm-d32d4bf71b4f
module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'index.js',
    library: 'PromiseDialog',
    globalObject: 'this',
    libraryTarget: 'umd',
  },
  resolve: {
    extensions: ['.js', '.ts', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: [
          // {
          //   loader: MiniCssExtractPlugin.loader,
          // },
          'style-loader',
          'css-loader',
          'postcss-loader',
        ],
      },
    ],
  },
  // plugins: [
  //   new MiniCssExtractPlugin({
  //     filename: 'style.css',
  //   }),
  // ],
  optimization: {
    // We no not want to minimize our code.
    minimize: false,
  },
}
