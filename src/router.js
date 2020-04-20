const { index } = require("./middlewares");

const { createUser, logIn } = require("./controllers/auth");

module.exports = (app) => {
  // send api docs inside index.html on '/'
  app.get("/", index);
  app.post("/signup", createUser);
  app.post("/login", logIn);
};
