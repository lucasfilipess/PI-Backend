const crypto = require('crypto');

const passwordEncrypt = {
  algoritmo: "aes256",
  segredo: "chaves",
  tipo: "hex"
};
// const cipher = crypto.createCipher(passwordEncrypt.algoritmo, passwordEncrypt.segredo);

module.exports = function dencrypt(password) {
  const decipher = crypto.createDecipher(passwordEncrypt.algoritmo, passwordEncrypt.segredo);
  decipher.update(senha, passwordEncrypt.tipo);
  return decipher.final();
};

