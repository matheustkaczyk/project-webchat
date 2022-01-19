  const socket = window.io();

  const formMessage = document.getElementById('formMessage');
  const formNickname = document.getElementById('formNickname');
  const messageInput = document.getElementById('input-msg');
  const nicknameInput = document.getElementById('input-nickname');
  const messageList = document.getElementById('message-list');

  const message = { chatMessage: '', nickname: sessionStorage.getItem('nickname') || '' };

  formNickname.addEventListener('submit', (e) => {
    e.preventDefault();

    message.nickname = nicknameInput.value;
    sessionStorage.setItem('nickname', nicknameInput.value);

    return false;
  });

  formMessage.addEventListener('submit', (e) => {
    e.preventDefault();

    message.chatMessage = messageInput.value;

    socket.emit('message', message);
    messageInput.value = '';
    return false;
  });

  const renderMessage = (msg) => {
    const li = document.createElement('li');
    li.setAttribute('data-testid', 'message');
    li.innerText = msg;
    messageList.appendChild(li);
  };

  socket.on('message', (msg) => renderMessage(msg));

  window.onbeforeunload = () => {
    socket.disconnect();
  };
