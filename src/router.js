const path = require("path");

module.exports = (app) => {
  // send api docs inside index.html on '/'
  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./index.html"));
  });
  
};
