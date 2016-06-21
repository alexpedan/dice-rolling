var path = require('path');

module.exports = {
	devtool: 'source-map',
    entry: {
        app: "./src/index.jsx"
    },
    output: {
        path: path.resolve(__dirname, "build"),
        publicPath: "/public/",
        filename: "bundle.js"
    },

	devServer: {
		historyApiFallback: true,
		port: 7070
	},

    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                query: {
                    presets: ['es2015', 'react', 'stage-0']
                }
            }
        ]
    }
};
