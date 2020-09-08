const React = require('react');
const ReactDOMServer = require('react-dom/server');
const { StaticRouter } = require('react-router-dom');
const { renderRoutes } = require('react-router-config');
const cacheResponse = require('../utils/CacheResponse');
const { FIVE_MINUTES_IN_SECONDS } = require('../utils/time');
const routes = require('../../client/routes/serverRoutes').default;

const setResponse = (html, manifest) => {
  const mainStyles = manifest ? manifest['main.css'] : '/assets/app.css';
  const mainBuild = manifest ? manifest['main.js'] : '/assets/app.js';
  const vendorsBuild = manifest ? manifest['vendors.js'] : '/assets/vendors.js';

  return `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="stylesheet" href="${mainStyles}" type="text/css">
      <title>Mercado Libre Test</title>
    </head>
    <body>
      <div id="app">${html}</div>
      <script src="${mainBuild}" type="text/javascript"></script>
      <script src="${vendorsBuild}" type="text/javascript"></script>
    </body>
  </html>`;
};

const render = (req, res) => {
  cacheResponse(res, FIVE_MINUTES_IN_SECONDS);
  const html = ReactDOMServer.renderToString(
    <StaticRouter location={req.url} context={{}}>
      {renderRoutes(routes)}
    </StaticRouter>,
  );

  res.send(setResponse(html, req.hashManifest));
};

const renderApp = (app) => {
  app.get('*', render);
};

module.exports = {
  renderApp,
};
