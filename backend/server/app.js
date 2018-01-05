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

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/arbie')
.then((res) => {
  server.listen(port,(req, res) =>{
    console.log(`Server is listening to port:${port}`);
  });
})
.catch((err) => {
  console.error('ERROR: Cannot Connect To Mongo DB');
});


