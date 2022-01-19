const connection = require('./connection');

const getMessages = () => connection()
  .then((db) => db.collection('messages').find({}).toArray())
  .then((result) => result);

const postMessages = (message, nickname, timestamp) => connection()
  .then((db) => db.collection('messages').insertOne({
    message,
    nickname,
    timestamp,
  }))
  .then((result) => result);

module.exports = { getMessages, postMessages };
