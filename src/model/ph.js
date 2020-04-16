const mongoose = require("mongoose");

const phSchema = new mongoose.Schema({
  value: {
    type: Number,
    min: 0,
    max: 14,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

module.exports = phSchema;
