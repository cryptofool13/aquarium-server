const { verify } = require("jsonwebtoken");

const User = require("../model/user");
const { Tank } = require("../model/tank");

exports.newTank = function (req, res, next) {
  let tankInput = req.body;
  const token = req.headers.authorization.split(" ")[1];
  const decoded = verify(token, process.env.jwtSecret);
  User.findById(decoded.sub).then((doc) => {
    let { tanks } = doc;
    console.log("tanks: ", tanks);
    if (!tanks) {
      tanks = [];
    }
    Tank.create({ name: tankInput.name, gallons: tankInput.gallons }).then(
      (doc) => {
        doc.save();
        console.log(doc);
        tanks.push(doc._id);
        User.findByIdAndUpdate(
          decoded.sub,
          { tanks: tanks },
          { new: true }
        ).then((doc) => {
          res.send(doc);
        });
      }
    );
  });

  // res.send(decoded)
};
