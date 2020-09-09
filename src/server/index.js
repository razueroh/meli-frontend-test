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
const getManifest = require('./getManifest');

if (config.dev) {
  const webpackConfig = require('../../webpack.dev');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const compiler = webpack(webpackConfig);
  const serverConfig = { port: config.port, hot: true };

  app.use(webpackDevMiddleware(compiler, serverConfig));
  app.use(webpackHotMiddleware(compiler));
} else {
  app.use((req, res, next) => {
    if (!req.hashManifest) {
      req.hashManifest = getManifest();
    }
    next();
  });
  app.use(express.static(`${__dirname}/public`));
}

itemsApi(app);
renderApp(app);

// error handler
app.use((err, req, res, next) => {
  if (err && err.response) {
    const { status, error, message } = err.response.data;
    res.status(status).json({ status, error, message });
  } else {
    res.status(500).json({ status: 500, error: 'Internal Server Error', message: 'Unknown error' });
  }
});

app.listen(config.port, () => console.log(`Listening on http://localhost:${config.port}`));
