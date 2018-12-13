let path = require('path');
let webpack = require('webpack');
let OUTPUT = path.join(__dirname, 'public');
// let OUTPUT = path.join(__dirname, '../wi-angular/source/vendor/js');

const generalConfig = {
    entry: [
        './client/components/file-explorer/file-explorer.js',
        './node_modules/pdfjs-dist/build/pdf.worker.entry.js',
    ],
    output: {
        path: OUTPUT,
        filename: 'file-explorer-module.js',
    },
    module: {
        rules: [
            { test: /\.css$|\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },
            { test: /\.html$/, use: 'html-loader' },
            {
                test: /\.(png|gif|svg)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        // outputPath: '../../img/'
                        outputPath: 'img/',
                    },
                },
            },
        ],
    },
    // plugins: [
    //     new webpack.ProvidePlugin({
    //         $: 'jquery',
    //         jQuery: 'jquery'
    //     })
    // ]
};
module.exports = (env, argv) => {
    const config = Object.assign({}, generalConfig, {
        mode: argv.mode,
    })
    return config;
}
