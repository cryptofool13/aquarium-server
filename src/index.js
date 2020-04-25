require("dotenv").config();
const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

mongoose.connect(
	process.env.dbUri,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	},
	(err) => {
		if (!err) {
			console.log("connected to db!");
		} else {
			console.log("db error:\n", err);
		}
	}
);

const router = require("./router");

const app = express();

app.use(bodyParser.json({ type: "*/*" }));
app.use(bodyParser.urlencoded({ extended: true }));

router(app);

const server = http.createServer(app);

server.listen(8080);
console.log("listening");
