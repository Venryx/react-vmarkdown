/* global __dirname */
var webpack = require("webpack");
var HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

module.exports = {
	mode: "none",
	entry: [
		"./Source/Main.tsx"
	],
	output: {
		path: __dirname + "/Dist",
		publicPath: "http://localhost:8080/",
		filename: "Main.js",
		libraryTarget: "umd",
    	//library: "react-vscrollview",
	},
	resolve: {
		//root: paths.client(),
		//root: "Source",
		extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
	},
	externals: {
		// use external version of React (ie, don't bundle react, since any app using this library will already have it available)
		//"react": "React",
		"react": "commonjs react",
		"react-dom": "commonjs react-dom",
		"react-vextensions": "commonjs react-vextensions",
		"react-vcomponents": "commonjs react-vcomponents",
	},
	/*module: {
		noParse: ["react"]
	},*/
	module: {
		rules: [
			{
				test: /\.(jsx?|tsx?)$/,
				loader: "babel-loader",
				exclude: /node_modules/,
				query: {
					presets: ["@babel/env", "@babel/react"]
				}
			},
			{test: /\.tsx?$/, loader: "ts-loader"},
			{
				test: /\.(png|jpg|jpeg|svg)$/,
				loader: "file"
			}
		]
	},
	plugins: [
		new webpack.NoEmitOnErrorsPlugin(),
		//new webpack.IgnorePlugin(/react/),
		new HardSourceWebpackPlugin(),
	]
};