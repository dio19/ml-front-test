const express = require('express');
const server = express();
const cors = require('cors');

const apiRouter = require('./routes');

server.use(cors());
server.use('/api/', apiRouter);


server.listen(4000);
console.log('=> El Servidor corre en el puerto 4000 ✔');