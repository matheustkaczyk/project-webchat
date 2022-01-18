module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(`Usuário se conectou com o id: ${socket.id}`);

    socket.on('message', (message) => {
      io.emit('serverMessage', message);
    });
  });

  io.on('disconnect', (socket) => {
    socket.broadcast.emit('serverMessage', `O usuário de id: ${socket.id} se desconectou`);
  });
};
