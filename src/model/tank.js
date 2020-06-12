const mongoose = require("mongoose");

const { phList } = require("./ph");
const { nitroList } = require("./nitro");

const tankSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  gallons: {
    type: Number,
    required: true, 
  },
  ph: phList,
  nitro: nitroList,
});

// const tankList = new mongoose.Schema({
//   tanks: [tankSchema],
// });

const Tank = mongoose.model("Tank", tankSchema)

module.exports = { Tank, tankSchema };
