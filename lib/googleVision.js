// // Imports the Google Cloud client libraries
// const Storage = require('@google-cloud/storage');
// const Vision = require('@google-cloud/vision');
//
// // Instantiates clients
// const storage = Storage();
// const vision = Vision();
//
// // The name of the bucket where the file resides, e.g. "my-bucket"
// const bucketName = 'breakfastclubproject3';
//
// // The path to the file within the bucket, e.g. "path/to/image.png"
// const fileName = './demo-image.jpg';
//
// function googleVision(req, res, next) {
//   console.log('this time');
//   // Performs label detection on the remote file
//   vision.detectLabels(storage.bucket(bucketName).file(fileName))
//     .then((results) => {
//       const labels = results[0];
//
//       console.log('Labels:');
//       labels.forEach((label) => console.log(label));
//     });
//   next();
// }




// Imports the Google Cloud client library
const Vision = require('@google-cloud/vision');

// Your Google Cloud Platform project ID
const projectId = 'project-3-162908';

// Instantiates a client
const visionClient = Vision({
  projectId: projectId
});

// The name of the image file to annotate
const fileName = './demo-image.jpg';

function googleVision(req, res, next) {
  // Performs label detection on the image file
  visionClient.detectLabels(fileName)
    .then((results) => {
      const labels = results[0];

      console.log('Labels:');
      labels.forEach((label) => console.log(label));
    });
  next();
}






// -----------------
//
// // Imports the Google Cloud client library
// const Vision = require('@google-cloud/vision');
//
// // Instantiates a client
// const vision = Vision();
//
// // The path to the local image file, e.g. "/path/to/image.png"
// const fileName = 'https://storage.googleapis.com/breakfastclubproject3/demo-image.jpg';
//
//
// function googleVision(req, res, next) {
//   console.log('Google Vision');
//   // Performs landmark detection on the local file
//   vision.detectLabels(fileName)
//     .then((results) => {
//       const labels = results[0];
//
//       console.log('Labels:');
//       labels.forEach((label) => console.log(label));
//     });
//   next();
// }

module.exports = googleVision;
