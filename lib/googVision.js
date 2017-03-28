var request = require('request');


const reqData = `[
  {
   'features': [
    {
     'type': 'LABEL_DETECTION'
    }
   ],
   'image': {
    'source': {
     'gcsImageUri': 'gs://breakfastclubproject3/demo-image.jpg'
    }
   }
  }
 ]`;

// const reqData = `{
//  'requests': [
//   {
//    'features': [
//     {
//      'type': 'LABEL_DETECTION'
//     }
//    ],
//    'image': {
//     'source': {
//      'gcsImageUri': 'gs://breakfastclubproject3/demo-image.jpg'
//     }
//    }
//   }
//  ]
// }`;


//
//
// // function googVision(req, res, next) {
// //   console.log('googleVision');
// //   request.post(
// //       'https://vision.googleapis.com/v1/images:annotate?key=AIzaSyBWXs5eQMEdN8caiQ-9QO0GqxRifMqNPyU',
// //       { json: data },
// //       function (error, response, body) {
// //         console.log('error');
// //         console.log(error);
// //         console.log('response');
// //         console.log(response);
// //         console.log('body');
// //         console.log(body);
// //       });
// //   next();
// // }
//
//
// // function googVision(req, res, next) {
// //   console.log('this might work');
// //   request({
// //     url: 'https://vision.googleapis.com/v1/images:annotate?key=AIzaSyBWXs5eQMEdN8caiQ-9QO0GqxRifMqNPyU',
// //     method: 'POST',
// //     json: true,   // <--Very important!!!
// //     body: data
// //   }, function (error, response, body){
// //     console.log('error');
// //     console.log(error);
// //     console.log('response');
// //     console.log(response);
// //     console.log('body');
// //     console.log(body);
// //   });
// //   next();
// // }
//
// function googVision() {
//   request.post('https://vision.googleapis.com/v1/images:annotate?key=AIzaSyBWXs5eQMEdN8caiQ-9QO0GqxRifMqNPyU', {json: true, requests: data}, function(error, response, body) {
//     console.log('error');
//     console.log(error);
//     console.log('response');
//     console.log(response);
//     console.log('body');
//     console.log(body.responses);
//     console.log(body.object);
//   });
// }



// function googVision(req, res, next) {
//   console.log('googleVision');
//
//
//   request({
//     type: 'POST',
//     url: 'https://vision.googleapis.com/v1/images:annotate?key=AIzaSyBWXs5eQMEdN8caiQ-9QO0GqxRifMqNPyU',
//     dataType: 'json',
//     data: reqData,
//     //Include headers, otherwise you get an odd 400 error.
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   },
//
//   function(error, response, body) {
//     console.log('success');
//     console.log('error');
//     console.log(error);
//     console.log('response');
//     console.log(response);
//     console.log('body');
//     console.log(body.responses);
//     console.log(body.object);
//   });
//   next();
// }

function googVision(req, res, next) {
  console.log('this might work');
  request({
    url: 'https://vision.googleapis.com/v1/images:annotate?key=AIzaSyBWXs5eQMEdN8caiQ-9QO0GqxRifMqNPyU',
    method: 'POST',
    json: true,   // <--Very important!!!
    requests: reqData
  }, function (error, response, body){
    console.log('error');
    console.log(error);
    console.log('response');
    console.log(response);
    console.log('body');
    console.log(body);
  });
  next();
}

module.exports = googVision;
