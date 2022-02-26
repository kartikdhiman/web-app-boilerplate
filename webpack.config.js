const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const isProduction = process.env.NODE_ENV == "production";

const config = {
  target: "es2020",
  entry: "./src/index.js",
  output: {
    filename: "script.[hash].js",
    path: path.resolve(__dirname, "dist"),
    chunkFormat: "module"
  },
  devServer: {
    open: true,
    host: "localhost",
    port: 9000
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "esbuild-loader",
        options: {
          target: "es2020"
        }
      },
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset",
      },
    ],
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = "production";
    config.module.rules[1].use[0] = MiniCssExtractPlugin.loader;
    config.plugins.push(
      new MiniCssExtractPlugin({filename: "style.[hash].css"}), 
      new CleanWebpackPlugin()
    );
  } else {
    config.mode = "development";
  }
  return config;
};
