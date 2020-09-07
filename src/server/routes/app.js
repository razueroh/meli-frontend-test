const React = require('react');
const ReactDOMServer = require('react-dom/server');
const { StaticRouter } = require('react-router-dom');
const { renderRoutes } = require('react-router-config');
const routes = require('../../client/routes/serverRoutes').default;

const setResponse = (html) => `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="/assets/app.css" type="text/css">
    <title>Mercado Libre Test</title>
  </head>
  <body>
    <div id="app">${html}</div>
    <script src="/assets/app.js" type="text/javascript"></script>
  </body>
</html>`;

const render = (req, res) => {
  const html = ReactDOMServer.renderToString(
    <StaticRouter location={req.url} context={{}}>
      {renderRoutes(routes)}
    </StaticRouter>,
  );

  res.send(setResponse(html));
};

const renderApp = (app) => {
  app.get('*', render);
};

module.exports = {
  renderApp,
};
