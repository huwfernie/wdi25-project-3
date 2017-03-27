const mongoose = require('mongoose');
const s3 = require('../lib/s3');

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

sprintSchema
  .path('image')
  .set(function getPreviousImage(image){
    this._image = this.image;
    return image;
  });

sprintSchema
  .virtual('imageSRC')
  .get(function getImageSRC() {
    if(this.image) return null;
    return `https://s3-eu-west-1.amazonaws.com/kriszwdi/${this.image}`;
  });

sprintSchema.pre('save', function checkPreviousImage(next) {
  if(this.isModified('image') && this._image) {
    return s3.deleteObject({ Key: this._image }, next);
  }
  next();
});

sprintSchema.pre('remove', function deleteImage(next) {
  if(this.image) return s3.deleteObject({ Key: this.image}, next );
  next();
});


module.exports = mongoose.model('Sprint', sprintSchema);
