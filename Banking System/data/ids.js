const ids = [];

function generateRandomId(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let result = "";
  let isUnique = false;

  do {
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    isUnique = !ids.includes(result);

    if (!isUnique) {
      result = "";
    }
  } while (!isUnique);
  ids.push(result);

  return result;
}

module.exports = { ids, generateRandomId };
