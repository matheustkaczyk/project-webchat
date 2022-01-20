const fDate = require('../helpers/dateFormatter');

const { postMessages, getMessages } = require('../models/webChat');

module.exports = (io) => {
  io.on('connection', async (socket) => {
    const loadedMessages = await getMessages();
    socket.emit('loadMessages', loadedMessages);

    socket.on('message', async (message) => {
      io.emit('message', `${fDate()} - ${message.nickname}: ${message.chatMessage}`);
      await postMessages(message.chatMessage, message.nickname, fDate());
    });
  });
};
