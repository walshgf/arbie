const Express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const server = Express();

server.use(bodyParser.json());
server.use(cors());

require('./controllers')(server);

module.exports = server;