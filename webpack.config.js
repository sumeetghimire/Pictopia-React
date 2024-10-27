const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development', // Set to 'production' for a production build
  entry: './src/Pictopia.js', // Your entry point
  output: {
    filename: 'Pictopia.js', // Output file for JavaScript
    path: path.resolve(__dirname, 'dist'), // Output directory
    libraryTarget: 'umd', // Universal Module Definition
  },
  module: {
    rules: [
      {
        test: /\.js$/, // Process JavaScript files
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // Use Babel for JS files
        },
      },
      {
        test: /\.css$/, // Process CSS files
        use: [
          MiniCssExtractPlugin.loader, // Extract CSS to a separate file
          'css-loader', // Load CSS files
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'Pictopia.css', // Output name for the extracted CSS
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'], // Resolve these extensions
  },
  externals: {
    react: 'react', // Treat React as an external dependency
  },
};
