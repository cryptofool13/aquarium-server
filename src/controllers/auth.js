const { sign, verify } = require("jsonwebtoken");

const User = require("../model/user");

function tokenForUser(user) {
  const timestamp = Math.floor(Date.now() / 1000);

  return sign({ sub: user.id, iat: timestamp }, process.env.jwtSecret, {
    // set to longer exp when done testing
    expiresIn: "1hr",
  });
}

exports.createUser = function (req, res, next) {
  let newUser = req.body;
  User.create({
    name: newUser.name,
    password: newUser.password,
  })
    .then((user) => {
      user.save((e, doc) => {
        if (!e) {
          const token = tokenForUser(doc);
          res.json({ token });
        } else {
          res.json({ e, where: "inside user.save" });
        }
      });
    })
    .catch((e) => {
      if (e.code === 11000) {
        res.json({ error: "User already exists" });
      }
      res.json({ e, where: "catch case" });
    });
};

exports.logIn = function (req, res, next) {
  let returningUser = req.body;

  User.findOne({ name: returningUser.name })
    .then((user) => {
      user.comparePassword(returningUser.password, (err, auth) => {
        if (!auth) {
          res.json({ error: "incorrect name or password!" });
        } else {
          const token = tokenForUser(user);
          res.json({ token });
        }
      });
    })
    .catch((e) => {
      res.status(500).json({ error: "internal server error" });
    });
};

exports.getUserData = function (req, res, next) {
  let token = req.headers.authorization.split(" ")[1];
  verify(token, process.env.jwtSecret, { ignoreExpiration: true }, function (
    err,
    decoded
  ) {
    if (err) {
      res.json({ error: "jwt valid error" });
    }
    let id = decoded.sub;
    User.findById(id)
      .then((doc) => {
        console.log(doc);
        res.json({
          user: {
            name: doc.name,
            tanks: doc.tanks,
          },
        });
      })
      .catch((e) => {
        res.status(500).json({ error: "internal server error" });
      });
  });
};

exports.verifyToken = function (req, res, next) {
  // add logic to verify corresponding user exists in DB?
  let token = req.headers.authorization.split(" ")[1];
  verify(token, process.env.jwtSecret, function (err, decoded) {
    if (err) {
      return res.json({ valid: false });
    }
    res.json({ valid: true });
  });
};
