const express = require('express');
const socketIo = require('socket.io');
const path = require('path');
const cors = require('cors');
const http = require('http');

const PORT = 3000 || process.env.PORT;

const app = express();

app.use(express.json());
app.use(cors());

const httpServer = http.createServer(app);

const io = socketIo(httpServer, {
  cors: {
    origin: 'https://localhost:3000',
    method: ['GET', 'POST'],
  },
});

// app.use(express.static(path.join(__dirname, '.././views')));

require('./src/sockets/chatMessage')(io);

app.get('/', (_req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, './src/views/index.html'));
});

httpServer.listen(PORT, () => console.log(`Conectado na porta ${PORT}`));
