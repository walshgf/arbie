const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const routes = require('./routes/index');
const server = express();

const corsOptions = {
    "origin": "http://localhost:3000",
    "credentials": true
};
server.use(bodyParser.json());
server.use(cors(corsOptions));

routes(server);

module.exports = server;


