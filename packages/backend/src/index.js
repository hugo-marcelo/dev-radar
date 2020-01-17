const cors = require('cors');
const express = require('express');
const http = require('http');
const mongoose = require('mongoose');

const routes = require('./routes');
const { setupWebSocket } = require('./websocket');

const app = express();
const server = http.Server(app);

setupWebSocket(server);

mongoose.connect(
  'mongodb+srv://rocketseat:rocketseat@cluster0-umivl.mongodb.net/dev-radar?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(3333);
