const fDate = require('../helpers/dateFormatter');
const randomString = require('../helpers/randomString');

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(`Usuário se conectou com o id: ${socket.id}`);

    socket.on('user', () => {
      io.emit('user', randomString());
    });

    socket.on('message', (message) => {
      const msg = `${fDate()} - ${message.nickname}: ${message.chatMessage}`;
      io.emit('message', msg);
    });

    // socket.on('user', () => {
    //   io.emit('user', randomName);
    // });
  });

  io.on('disconnect', (socket) => {
    socket.broadcast.emit('serverMessage', `O usuário de id: ${socket.id} se desconectou`);
  });
};
