const mongoose = require('mongoose');

const trackSchema = new mongoose.Schema({
  start: {
    lat: {type: Number, required: true},
    lng: {type: Number, required: true},
    img: {type: String, required: true}
  },
  finish: {
    lat: {type: Number, required: true},
    lng: {type: Number, required: true},
    img: {type: String, required: true}
  }
});

module.exports = mongoose.model('Track', trackSchema);
