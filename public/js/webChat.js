  const socket = window.io();

  const datatest = 'data-testid';

  const formMessage = document.getElementById('formMessage');
  const formNickname = document.getElementById('formNickname');
  const messageInput = document.getElementById('input-msg');
  const nicknameInput = document.getElementById('input-nickname');
  const messageList = document.getElementById('message-list');
  const usersList = document.getElementById('users');

  formNickname.addEventListener('submit', (e) => {
    e.preventDefault();

    sessionStorage.setItem('nickname', nicknameInput.value);

    return false;
  });

  formMessage.addEventListener('submit', (e) => {
    e.preventDefault();

    const message = { chatMessage: '', nickname: sessionStorage.getItem('nickname') };

    message.chatMessage = messageInput.value;

    socket.emit('message', message);
    messageInput.value = '';
    return false;
  });

  const renderMessage = (msg) => {
    if (typeof msg === 'string') {
      const li = document.createElement('li');
      li.setAttribute(datatest, 'message');
      li.innerText = msg;
      messageList.appendChild(li);
      }

    msg.forEach((m) => {
      const li = document.createElement('li');
      li.setAttribute(datatest, 'message');
      li.innerText = `${m.timestamp} - ${m.nickname}: ${m.message}`;
      messageList.appendChild(li);
    });
  };

  const renderUsers = (user) => {
    sessionStorage.setItem('nickname', user);
    const li = document.createElement('li');
    li.setAttribute(datatest, 'online-user');
    li.innerText = user;
    usersList.appendChild(li);

    return false;
  };

  socket.on('message', (msg) => renderMessage(msg));
  socket.on('user', (user) => renderUsers(user));
  socket.on('loadMessages', (messages) => renderMessage(messages));

  window.addEventListener('load', () => {
    socket.emit('user');
    socket.emit('loadMessages');
    // socket.emit('message');
  });

  // window.onbeforeunload = () => {
  //   socket.disconnect();
  // };
