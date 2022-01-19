module.exports = () => {
  const alphanumeric = 'abcdefghijklmnopqrstuvwxxyz0123456789';
  const randomString = [];
  const anSplit = alphanumeric.split('');

  for (let index = 0; randomString.length < 16; index = (Math.floor(Math.random() * 10))) {
    randomString.push(anSplit[index]);
  }

  return randomString.join('');
};