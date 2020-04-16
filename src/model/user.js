const mongoose = require("mongoose");
const crypto = require("crypto");

const nitroSchema = require("./nitro");
const phSchema = require("./ph");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  salt: {
    type: String,
    required: true,
  },
  nitro: [nitroSchema],
  ph: [phSchema],
});

userSchema

function genRandomString(length) {
  return crypto
    .randomBytes(Math.ceil(length / 2))
    .toString("hex")
    .slice(0, length);
}

function sha512(pw, salt) {
  const hash = crypto.createHmac("sha512", salt);
  hash.update(pw);
  const value = hash.digest("hex");

  return {
    salt,
    value,
  };
}
