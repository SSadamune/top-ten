const path = require('path');
const { override, addWebpackAlias, addWebpackModuleRule } = require('customize-cra');

module.exports = override(
    addWebpackAlias({
        '@': path.resolve(__dirname, 'src'),
    }),
    addWebpackModuleRule({
        test: /\.scss$/,
        use: [
            {
                loader: 'resolve-url-loader',
                options: { sourceMap: true },
            },
            {
                loader: 'sass-loader',
                options: { sourceMap: true },
            },
        ],
    })
);
