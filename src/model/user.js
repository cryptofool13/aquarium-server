const mongoose = require("mongoose");
const crypto = require("crypto");

const { nitroList } = require("./nitro");
const { phList } = require("./ph");
const { tankSchema } = require("./tank");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  salt: {
    type: String,
  },
  // tanks: [tankSchema],
  tanks: {
    type: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Tank",
      },
    ],
    validate: [limitTanks, "{PATH} exceeds the limit of 10"],
  },
});

function limitTanks(val) {
  return val.length <= 10;
}

userSchema.pre("save", function (next) {
  if (this.isNew) {
    const user = this;
    const salt = genRandomString(10);
    const hash = sha512(user.password, salt);

    user.password = hash;
    user.salt = salt;
  }
  next();
});

userSchema.methods.comparePassword = function (typedPw, cb) {
  let match = passwordsMatch(typedPw, this.password, this.salt);

  cb(null, match);
};

function genRandomString(length) {
  if (!length) {
    throw new Error("must provide a length for salt");
  }
  return crypto
    .randomBytes(Math.ceil(length / 2))
    .toString("hex")
    .slice(0, length);
}

function sha512(pw, salt) {
  const hash = crypto.createHmac("sha512", salt);
  hash.update(pw);
  const value = hash.digest("hex");

  return value;
}

function passwordsMatch(candidate, hashed, salt) {
  const hashedCandidate = sha512(candidate, salt);
  return hashed === hashedCandidate;
}

module.exports = mongoose.model("User", userSchema);
