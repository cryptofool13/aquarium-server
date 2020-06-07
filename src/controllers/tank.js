const { verify } = require("jsonwebtoken");

const User = require("../model/user");

exports.newTank = function (req, res, next) {
  let token = req.headers.authorization.split(" ")[1];
  let decoded = verify(token, process.env.jwtSecret)
  res.send(decoded)
};
