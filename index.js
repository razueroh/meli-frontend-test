const express = require('express');
const app = express();

const { config } = require('./config/index');
const itemsApi = require('./routes/items');

itemsApi(app);

app.listen(config.port, () =>
  console.log(`Listening on http://localhost:${config.port}`)
);
