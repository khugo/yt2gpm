const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve("build"),
    filename: "bundle.js"
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, loader: "babel-loader", exclude: /node_modules/, query: { presets: [ "es2017", "react" ]}}
    ]
  }
};