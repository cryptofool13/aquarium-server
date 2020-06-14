const { index, requireAuth } = require("./middlewares");

const {
  createUser,
  logIn,
  verifyToken,
  getUserData,
} = require("./controllers/auth");
const { newTank, getTank } = require("./controllers/tank");

module.exports = (app) => {
  // send api docs inside index.html on '/'
  app.get("/", index);
  app.post("/signup", createUser);
  app.post("/login", logIn);
  app.post("/verify", verifyToken);
  app.post("/tank/new", requireAuth, newTank);
  app.get("/tank/:tankId", requireAuth, getTank);
  app.get("/user", requireAuth, getUserData);
};
