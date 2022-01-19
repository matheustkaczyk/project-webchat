module.exports = () => {
  const date = new Date();
  const formattedDate = `${date.getDay()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  const formattedTime = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  const time = `${formattedDate} ${formattedTime}`;
  return time;
};