// Imports the Google Cloud client library
const Vision = require('@google-cloud/vision');

// Your Google Cloud Platform project ID
const projectId = 'project-3-162908';

// Instantiates a client
const visionClient = Vision({
  projectId: projectId
});

// The name of the image file to annotate
//const fileName = 'https://storage.googleapis.com/breakfastclubproject3/demo-image.jpg';
const fileName = 'https://upload.wikimedia.org/wikipedia/commons/4/44/Tower_Bridge_London_Feb_2006.jpg';

function googleVision(req, res, next) {
  console.log('google vision');
  // Performs label detection on the image file
  visionClient.detectLandmarks(fileName)
    //.promise here
    .then((results) => {
      const labels = results[0];

      console.log('Labels:');
      labels.forEach((label) => console.log(label));
      req.labels = results;
    })
  .then(next());
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
// const fileName = 'Full http:// ...png filename';
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
