const path = require("path");

const DIR_SRC = path.join(__dirname, "src");
const DIR_DIST = path.join(__dirname, "dist");

const Dotenv = require("dotenv-webpack");

const webpackConfig = {
	entry: path.join(DIR_SRC, "index.js"),
	output: {
		path: DIR_DIST,
		filename: "bundle.js"
	},
	module: {
		rules: []
	},
	devServer: {
		contentBase: DIR_DIST
	},
	plugins: [
		new Dotenv()
	]
};

const babelConfig = {
	test: /\.(js|jsx)$/,
	exclude: /node_modules/,
	use: ["babel-loader"]
};
webpackConfig.module.rules.push(babelConfig);

const cssConfig = {
	test: /\.css$/,
	exclude: /node_modules/,
	use: ["style-loader", "css-loader"]
};
webpackConfig.module.rules.push(cssConfig);

module.exports = webpackConfig;