const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')

module.exports = (env, argv) => {
  const isDev = argv.mode === 'development'
  const isProd = !isDev

  console.log('isProd: ', isProd)
  console.log('isDev: ', isDev)

  const filename = (ext) => {
    return isDev ? `[name].${ext}` : `[name].[hash].${ext}`
  }

  const plugins = () => {
    const base = [
      new HtmlWebpackPlugin({
        template: './index.html',
      }),

      new MiniCssExtractPlugin({
        filename: filename('css'),
      }),

      new CopyPlugin({
        patterns: [{ from: './favicon.ico', to: '../dist' }],
      }),
    ]

    if (isDev) {
      base.push(new ESLintPlugin())
    }

    return base
  }

  return {
    context: path.resolve(__dirname, 'src'),
    entry: {
      main: ['@babel/polyfill', './index.js'],
    },
    resolve: {
      extensions: ['.js'],
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@core': path.resolve(__dirname, 'core'),
      },
    },
    devtool: isDev ? 'source-map' : false,
    output: {
      clean: true,
      path: path.resolve(__dirname, 'dist'),
      filename: filename('js'),
    },
    devServer: {
      port: 3000,
      hot: true,
      watchFiles: './',
    },
    plugins: plugins(),
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            //
            MiniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader',
            //
          ],
        },
      ],
    },
  }
}
