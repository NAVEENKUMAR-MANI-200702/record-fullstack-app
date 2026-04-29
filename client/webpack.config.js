const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./src/index.js",

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/",
  },

  devServer: {
    port: 3000,
    historyApiFallback: true,
    open: true,
  },

  module: {
    rules: [
      {
        test: /\.js|jsx$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
    ],
  },

  resolve: {
    extensions: [".js", ".jsx"],
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      publicPath: "/",
      inject: "body",
    }),
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(process.env),
    }),
    new CopyPlugin({
      patterns: [{ from: "public", to: "" }],
    }),
  ],
};
