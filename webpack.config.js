const path = require('path');

module.exports = {
    entry: path.resolve(__dirname, 'src/index.ts'),
    target: "web",
    devtool: 'inline-source-map',
    watchOptions: {
        ignored: /node_modules/
    },
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.ts'],
    },
    output: {
        library: 'SparkEngine',
        libraryTarget: 'umd',
        filename: 'spark-engine-web.js',
        path: path.resolve(__dirname, 'dist/jsbundle'),
    }
};