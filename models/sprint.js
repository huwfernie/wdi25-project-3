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
  .path('start.img')
  .set(function getPreviousImage(image){
    this.start._img = this.start.img;
    return image;
  });

sprintSchema
  .virtual('start.imgSRC')
  .get(function getImageSRC() {
    if(!this.start.img) return null;
    return `https://s3-eu-west-1.amazonaws.com/${process.env.AWS_BUCKET_NAME}/${this.start.img}`;
  });

sprintSchema
  .path('finish.img')
  .set(function getPreviousImage(image){
    this.finish._img = this.finish.img;
    return image;
  });

sprintSchema
  .virtual('finish.imgSRC')
  .get(function getImageSRC() {
    if(!this.finish.img) return null;
    return `https://s3-eu-west-1.amazonaws.com/${process.env.AWS_BUCKET_NAME}/${this.finish.img}`;
  });


sprintSchema
  .virtual('duration')
  .get(function getDuration(){
    if(this.finish.img){
      console.log('FINISH', this.finish);
      var seconds = parseInt((this.finish.time.getTime() - this.start.time.getTime()) / 1000);
      var minutes = Math.floor(seconds % 3600 / 60);
      var hours = Math.floor(seconds / 3600);
      console.log(seconds);
      console.log(typeof seconds);
      return (hours ? (hours > 9 ? hours : '0' + hours) : '00') + ':' + (minutes ? (minutes > 9 ? minutes : '0' + minutes) : '00') + ':' + (seconds > 9 ? seconds : '0' + seconds);
    }
  });


// sprintSchema.pre('save', function checkPreviousImage(next) {
//   if(this.isModified('start.img') && this.start._img) {
//     return s3.deleteObject({ Key: this.start_img }, next);
//   }
//   next();
// });
//
// sprintSchema.pre('remove', function deleteImage(next) {
//   if(this.image) return s3.deleteObject({ Key: this.image}, next );
//   next();
// });


module.exports = mongoose.model('Sprint', sprintSchema);
