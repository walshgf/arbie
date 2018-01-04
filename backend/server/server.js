const Express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const server = Express();

server.use(bodyParser.json());
server.use(cookieParser());
server.use(cors());

require('./controllers')(server);

module.exports = server;