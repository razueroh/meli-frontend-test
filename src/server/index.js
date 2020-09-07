/* eslint-disable global-require */
require('ignore-styles');
require('regenerator-runtime/runtime');
require('@babel/register')({
  presets: ['@babel/preset-env', '@babel/preset-react'],
});

require('asset-require-hook')({
  extensions: ['jpg', 'png', 'gif'],
  name: '/assets/[hash].[ext]',
});
const webpack = require('webpack');

const express = require('express');

const app = express();

const { config } = require('./config/index');
const itemsApi = require('./routes/items');
const { renderApp } = require('./routes/app');

if (config.dev) {
  const webpackConfig = require('../../webpack.config');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const compiler = webpack(webpackConfig);
  const serverConfig = { port: config.port, hot: true };

  app.use(webpackDevMiddleware(compiler, serverConfig));
  app.use(webpackHotMiddleware(compiler));
}

itemsApi(app);
renderApp(app);

app.listen(config.port, () => console.log(`Listening on http://localhost:${config.port}`));
