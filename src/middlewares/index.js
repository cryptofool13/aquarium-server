const path = require("path");
const { verify } = require("jsonwebtoken");

const User = require("../model/user");

exports.index = function (req, res) {
  res.sendFile(path.join(__dirname + "../../index.html"));
};

exports.requireAuth = function (req, res, next) {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(400).json({ error: "unauthorized" });
  }
  verify(token, process.env.jwtSecret, async function (err, decoded) {
    if (err) {
      return res.status(400).json({ error: "jwt valid error" });
    }
    let user = await User.findById(decoded.sub);
    if (!user) {
      return res.status(400).json({ error: "unauthorized" });
    }
    next();
  });
};
