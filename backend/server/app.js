const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const routes = require('./routes/index');
const server = express();

const corsOptions = {
    "origin": "http://localhost:3000",
    "credentials": true
};
server.use(cors(corsOptions));

routes(server);

const PORT = 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



