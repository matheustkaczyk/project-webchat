const fDate = require('../helpers/dateFormatter');
const randomString = require('../helpers/randomString');

const { postMessages, getMessages } = require('../models/webChat');

module.exports = async (io) => {
  io.on('connection', (socket) => {
    console.log(`Usuário se conectou com o id: ${socket.id}`);

    socket.on('user', () => {
      io.emit('user', randomString());
    });

    socket.on('loadMessages', async () => {
      const loadedMessages = await getMessages();
      io.emit('loadMessages', loadedMessages);
    });

    socket.on('message', async (message) => {
      const msg = `${fDate()} - ${message.nickname}: ${message.chatMessage}`;
      io.emit('message', msg);

      await postMessages(message.chatMessage, message.nickname, fDate());
    });
  });

  // io.on('disconnect', (socket) => {
  //   socket.broadcast.emit('serverMessage', `O usuário de id: ${socket.id} se desconectou`);
  // });
};
