const { index } = require("./middlewares");

const { createUser, logIn, verifyToken, getUserData } = require("./controllers/auth");
const {newTank} = require('./controllers/tank')

module.exports = (app) => {
  // send api docs inside index.html on '/'
  app.get("/", index);
  app.post("/signup", createUser);
  app.post("/login", logIn);
  app.post("/verify", verifyToken);
  app.post("/tank/new", newTank);
  app.get("/user", getUserData)
};
