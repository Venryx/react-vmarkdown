/* global __dirname */
var webpack = require("webpack");

module.exports = {
	entry: [
		"./src/Main.tsx"
	],
	output: {
		path: __dirname + "/dist",
		publicPath: "http://localhost:8080/",
		filename: "Main.js",
		libraryTarget: "umd",
    	//library: "react-vscrollview",
	},
	resolve: {
		//root: paths.client(),
		root: "src",
		extensions: ["", ".js", ".jsx", ".ts", ".tsx", ".json"],
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
		loaders: [
			{
				test: /\.(jsx?|tsx?)$/,
				loader: "babel",
				exclude: /node_modules/,
				query: {
					presets: ["es2015", "react"]
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
		new webpack.NoErrorsPlugin(),
		//new webpack.IgnorePlugin(/react/),
	]
};