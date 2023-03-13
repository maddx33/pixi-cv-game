const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

const config = {
    mode: 'development',
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
            },
        ]
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                {from: 'index.html'},
                {from: 'src/css/style.css', to: 'css/'},
                { from: 'assets/**/*', to: 'assets/[name][ext]' }
            ],
        }),
    ],
    devServer: {
        static: {
          directory: path.join(__dirname, 'dist'),
        },
        compress: true,
        port: 8080,
        hot: true
    },
    optimization: {
        minimize: false
    }
};

module.exports = config;
