const fDate = require('../helpers/dateFormatter');
// const randomString = require('../helpers/randomString');

const { postMessages, getMessages } = require('../models/webChat');

const usersList = [];

module.exports = (io) => {
  io.on('connection', async (socket) => {
    const loadedMessages = await getMessages();
    socket.emit('loadMessages', loadedMessages);

    socket.on('user', (user) => {
      const alreadyExists = usersList.filter(({ id }) => id === socket.id);

      if (alreadyExists.length > 0) return false;

      usersList.push({ nickname: user, id: socket.id });
      io.emit('user', usersList);
    });

    socket.on('userUpdate', (updatedUser) => {
      console.log(updatedUser, usersList);
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

    socket.on('disconnect', () => {
      const remove = usersList.filter(({ id }) => id !== socket.id);
      console.log(remove, socket.id);
      userList = remove;
      io.emit('user', userList);
      console.log('indo para renderizacao')
    });
  });
};
