const crypto = require("crypto");
const key = require("./keys");
//I took it from https://www.sohamkamani.com/nodejs/rsa-encryption/
// console.log("encrypted data: ", encryptedData.toString("base64"));
// console.log("decrypted data: ", decryptedData.toString());


function encrypt (data) {
    return crypto.publicEncrypt(setRSA(key.public), Buffer.from(data))
}

function decrypt (data) {
    return crypto.privateDecrypt(setRSA(key.private) ,data)
}

function setRSA(keyType) {
    return {
        key: keyType,
        padding: crypto.constants.RSA_PKCS1_PADDING,
        oaepHash: "sha256",
    }
}

module.exports = {
    encrypt,
    decrypt
}