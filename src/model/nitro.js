const mongoose = require("mongoose");

const nitroSchema = new mongoose.Schema({
  nh3: {
    type: Number,
    min: 0,
    max: 80,
    reqiured: true,
  },
  no2: {
    type: Number,
    min: 0,
    max: 50,
    required: true,
  },
  no3: {
    type: Number,
    min: 0,
    max: 160,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

const nitroList = new mongoose.Schema({
  nitro: [nitroSchema],
});

module.exports = { nitroSchema, nitroList };
