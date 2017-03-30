const mongoose = require('mongoose');

const trackSchema = new mongoose.Schema({
  name: String,
  start: {
    name: { type: String, required: true },
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
    img: { type: String, required: true }
  },
  finish: {
    name: { type: String, required: true },
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
    img: { type: String, required: true }
  },
  distance: { type: Number }
});

module.exports = mongoose.model('Track', trackSchema);
