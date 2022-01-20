const usersList = [];

module.exports = (io) => {
  io.on('connection', async (socket) => {
    socket.on('user', (user) => {
      if (usersList.filter(({ id }) => id === socket.id) > 0) return false;

      usersList.push({ nickname: user, id: socket.id });
      io.emit('user', usersList);
    });

    socket.on('userUpdate', (updatedUser) => {
      usersList.forEach((user, index) => {
        if (user.id === socket.id) usersList[index].nickname = updatedUser;
        io.emit('user', usersList);
      });
    });

    socket.on('disconnect', () => {
      // obrigado ao meu amigo Pedro Medeiros por me auxiliar nesse trecho do código;
      const remove = usersList.findIndex(({ id }) => id === socket.id);
      usersList.splice(remove, 1);
      io.emit('user', usersList);
    });
  });
};