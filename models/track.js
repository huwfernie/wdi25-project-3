const mongoose = require('mongoose');

const trackSchema = new mongoose.Schema({
  start: {
    name: { type: String, required: true },
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
    img: { type: String, required: true },
    distance: { type: String }
  },
  finish: {
    name: { type: String, required: true },
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
    img: { type: String, required: true }
  },
  distance: { type: String },
  attemptedBy: [],
  favedBy: []
});

module.exports = mongoose.model('Track', trackSchema);
