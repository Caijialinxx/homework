const path = require('path');

module.exports = {
  entry: './src/index.js',
  devtool: 'inline-source-map',     // 使用 source map
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        // 加载CSS
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        // 加载图片
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader']
      },
      {
        // 加载字体
        test: /\.ttf$/,
        use: ['file-loader']
      }
    ]
  },
  devServer: {
    contentBase: './dist'
  }
};