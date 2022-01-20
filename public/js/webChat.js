  const socket = window.io();

  const datatest = 'data-testid';

  const formMessage = document.getElementById('formMessage');
  const formNickname = document.getElementById('formNickname');
  const messageInput = document.getElementById('input-msg');
  const nicknameInput = document.getElementById('input-nickname');
  const messageList = document.getElementById('message-list');
  const usersList = document.getElementById('users');

  const randomString = () => {
    const alphanumeric = 'abcdefghijklmnopqrstuvwxxyz0123456789';
    const randomS = [];
    const anSplit = alphanumeric.split('');
  
    for (let index = 0; randomS.length < 16; index = (Math.floor(Math.random() * 10))) {
      randomS.push(anSplit[index]);
    }
  
    return randomS.join('');
  };

  const newUser = () => {
    const alreadyExists = sessionStorage.getItem('nickname');

    if (alreadyExists === null) {
      const newU = randomString();
      sessionStorage.setItem('nickname', newU);
      socket.emit('user', newU);
      return false;
    }
    socket.emit('user', alreadyExists);
  };

  const loadMessages = (messages) => {
    if (messages) {
      messageList.innerText = '';
      messages.forEach((m) => {
        const li = document.createElement('li');
        li.setAttribute(datatest, 'message');
        li.innerText = `${m.timestamp} - ${m.nickname}: ${m.message}`;
        messageList.appendChild(li);
      });
    }
  };

  const renderMessage = (msg) => {
    if (typeof msg === 'string') {
      const li = document.createElement('li');
      li.setAttribute(datatest, 'message');
      li.innerText = msg;
      messageList.appendChild(li);
      return false;
    }
  };

  const renderUsers = (users) => {
    usersList.innerHTML = '';
    
    users.forEach((user) => {
      const li = document.createElement('li');
      li.setAttribute(datatest, 'online-user');
      li.innerText = user.nickname;
      usersList.appendChild(li);
      return false;
    });
  };

  formNickname.addEventListener('submit', (e) => {
    e.preventDefault();

    if (nicknameInput.value === '') {
      sessionStorage.setItem('nickname', randomString());
      socket.emit('userUpdate', randomString());
      return false;
    }

    sessionStorage.setItem('nickname', nicknameInput.value);
    socket.emit('userUpdate', nicknameInput.value);
  });

  formMessage.addEventListener('submit', (e) => {
    e.preventDefault();

    const message = {
      chatMessage: messageInput.value,
      nickname: sessionStorage.getItem('nickname'),
    };

    socket.emit('message', message);
    messageInput.value = '';
    return false;
  });

  socket.on('loadMessages', (message) => loadMessages(message));
  socket.on('message', (msg) => renderMessage(msg));
  socket.on('user', (user) => renderUsers(user));
  socket.on('firstTimeUser', (user) => renderUsers(user));
  socket.on('loadMessages', (messages) => renderMessage(messages));
  socket.on('serverMessage', (serverMessage) => renderMessage(serverMessage));

  window.addEventListener('load', () => {
    newUser();
    socket.emit('loadMessages');
  });

  window.onbeforeunload = () => {
    socket.disconnect();
  };
