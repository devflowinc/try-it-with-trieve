const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");

/** @type {import('webpack').Configuration} */
const config = {
  mode: "production", // Change this to production
  entry: {
    content: "./src/content.tsx",
    styles: "./src/styles/button.css",
  },
  output: {
    path: path.resolve(__dirname, "dist/js"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "src/manifest.json", to: "../manifest.json" },
        { from: "src/styles/button.css", to: "../css/styles.css" },
        { from: "src/images", to: "../images" }, // Add this line
      ],
    }),
    new MiniCssExtractPlugin({
      filename: "../css/[name].css",
    }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production"),
    }),
  ],
};

module.exports = config;
