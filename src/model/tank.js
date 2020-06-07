const mongoose = require("mongoose");

const { phList } = require("./ph");
const { nitroList } = require("./nitro");

const tankSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  ph: phList,
  nitro: nitroList,
});

const tankList = new mongoose.Schema({
  tanks: [tankSchema],
});

module.exports = { tankSchema, tankList };
