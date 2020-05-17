require("dotenv").config();
const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require('cors')

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
app.use(cors())

router(app);

const server = http.createServer(app);

server.listen(8080);
console.log("listening");
