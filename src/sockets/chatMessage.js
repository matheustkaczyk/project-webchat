const fDate = require('../helpers/dateFormatter');
// const randomString = require('../helpers/randomString');

const { postMessages, getMessages } = require('../models/webChat');

const usersList = [];

module.exports = (io) => {
  io.on('connection', async (socket) => {
    const loadedMessages = await getMessages();
    socket.emit('loadMessages', loadedMessages);

    socket.on('user', (user) => {
      console.log(user);
      usersList.push({ nickname: user, id: socket.id });
      io.emit('user', usersList);
    });

    socket.on('userUpdate', (updatedUser) => {
      usersList.forEach((user, index) => {
        if (user.id === socket.id) usersList[index].nickname = updatedUser;
        io.emit('user', usersList);
      });
    });

    socket.on('message', async (message) => {
      console.log(usersList)
      io.emit('message', `${fDate()} - ${message.nickname}: ${message.chatMessage}`);
      await postMessages(message.chatMessage, message.nickname, fDate());
    });

    // socket.on('disconnect', () => {
    //   socket.broadcast.emit('serverMessage', `O usuário de id: ${socket.id} se desconectou`);
    // });
  });
};
