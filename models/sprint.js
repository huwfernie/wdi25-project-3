const mongoose = require('mongoose');

const sprintSchema = new mongoose.Schema({
  start: {
    time: { type: Date },
    img: { type: String }
  },
  finish: {
    time: { type: Date },
    img: { type: String }
  },
  createdBy: { type: String }
});

module.exports = mongoose.model('Sprint', sprintSchema);
