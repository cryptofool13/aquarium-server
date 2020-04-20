const User = require("../model/user");

exports.createUser = function (req, res, next) {
  let newUser = req.body;
  User.create({ name: newUser.name, password: newUser.password }).then(
    (user) => {
      user.save((e, doc) => {
        console.log(doc);
        res.send(doc);
      });
    }
  );
};

exports.logIn = function (req, res, next) {
  let returningUser = req.body;

  User.findOne({ name: returningUser.name }).then((err, user) => {
    console.log(user)
    user.comparePassword(returningUser.password, console.log);
  });
};
