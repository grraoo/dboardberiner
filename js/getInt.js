function getInt(data) {
  let num = parseInt(data, 10);
  return isNaN(num) ? 0 : num;
}

export default getInt;
