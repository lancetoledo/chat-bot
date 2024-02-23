const path = require('path');
const Buffer = require('buffer').Buffer;

module.exports = {
    // other webpack configuration options...
    resolve: {
        fallback: {
            "path": require.resolve("path-browserify"),
            "os": require.resolve("os-browserify/browser"),
            "crypto": require.resolve("crypto-browserify"),
            "stream": require.resolve("stream-browserify"), // Add stream polyfill
            buffer: require.resolve('buffer'),
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/, // Apply this rule to files ending in .js
                exclude: /node_modules/, // Exclude node_modules directory
                use: {
                    loader: 'babel-loader', // Use babel-loader for transpiling JS files
                    options: {
                        presets: ['@babel/preset-react'] // Use @babel/preset-react to transpile JSX
                    }
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                        },
                    },
                ],
            },
        ]
    }
};
