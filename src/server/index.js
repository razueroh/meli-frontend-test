const express = require('express');
const cors = require('cors');

const app = express();

const { config } = require('./config/index');
const itemsApi = require('./routes/items');

app.use(cors());

itemsApi(app);

app.listen(config.port, () => console.log(`Listening on http://localhost:${config.port}`));
