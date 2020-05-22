const { sign } = require("jsonwebtoken");

const User = require("../model/user");

function tokenForUser(user) {
  const timestamp = new Date().getTime();

  return sign({ sub: user.id, iat: timestamp }, process.env.jwtSecret);
  // return jwt.encode({ sub: user.id, iat: timestamp }, process.env.SECRET);
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
          res.json(token);
        } else {
          res.json(e);
        }
      });
    })
    .catch((e) => {
      res.json(e);
    });
};

exports.logIn = function (req, res, next) {
  let returningUser = req.body;

  User.findOne({ name: returningUser.name }).then((user) => {
    user.comparePassword(returningUser.password, (err, auth) => {
			if(!auth) {
				res.json({message: "incorrect name or password!"})
			} else {
				const token = tokenForUser(user)
				res.json({token})
			}
		});
    // res.send(user);
  }).catch(e => {
    res.json({message: "incorrect username or password"})
    console.log(e)
  });
};
