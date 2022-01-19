const fDate = require('../helpers/dateFormatter');

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(`Usuário se conectou com o id: ${socket.id}`);

    socket.on('message', (message) => {
      io.emit('message', `${fDate()} - ${message.nickname}: ${message.chatMessage}`);
    });
  });

  io.on('disconnect', (socket) => {
    socket.broadcast.emit('serverMessage', `O usuário de id: ${socket.id} se desconectou`);
  });
};
