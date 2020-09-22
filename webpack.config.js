const path = require('path');

module.exports = {
	entry: './src/index',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js',
		publicPath: "/",
		libraryTarget: 'umd',
	},
	devtool: 'source-map',
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.json'],
	},
	module: {
		rules: [
			{ test: /\.tsx?$/, loader: 'awesome-typescript-loader' },
			{
				test: /\.[tj]sx?$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				options: { presets: [require.resolve('@babel/preset-env')] },
				enforce: 'post',
			},
		],
	},
}
