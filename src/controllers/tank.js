const { verify } = require("jsonwebtoken");

const User = require("../model/user");
const { Tank } = require("../model/tank");

exports.newTank = function (req, res, next) {
  let tankInput = req.body;
  const token = req.headers.authorization.split(" ")[1];
  const decoded = verify(token, process.env.jwtSecret);
  User.findById(decoded.sub).then((doc) => {
    // create new tank
    let tank = new Tank({
      name: tankInput.name,
      gallons: tankInput.gallons,
      _owner: decoded.sub,
    });
    // save tank and to _owner object
    tank.save((err) => {
      if (err) console.log("tank save error:", err);
    });
    doc.tanks.push(tank._id);
    // save changes done to _owner and populate tanks
    doc.save((err) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      doc.populate("tanks");
      res.json(doc);
    });
  });
};

exports.getTank = function (req, res, next) {
  let { tankId } = req.params;
  // res.send(tankId);
  Tank.findById(tankId)
    .then((doc) => {
      res.json(doc);
    })
    .catch((e) => {
      res.send(e);
    });
};
