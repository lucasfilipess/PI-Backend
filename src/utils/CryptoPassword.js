const crypto = require('crypto');

const passwordEncrypt = {
  algoritmo: "aes256",
  segredo: "chaves",
  tipo: "hex"
};
const cipher = crypto.createCipher(passwordEncrypt.algoritmo, passwordEncrypt.segredo);

module.exports = function encrypt(password) {
  cipher.update(password);
  return cipher.final(passwordEncrypt.tipo);

};
