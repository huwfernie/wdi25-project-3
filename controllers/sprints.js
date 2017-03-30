const Sprint = require('../models/sprint');

function indexRoute(req, res, next) {
  Sprint
    .find()
    .populate('createdBy')
    .exec()
    .then((sprints) => res.json(sprints))
    .catch(next);
}

function createRoute(req, res, next) {
  req.body.start = {};
  req.body.finish = {};

  if(req.file) req.body.start.img = req.file.filename;

  req.body.start.time = new Date();
  // image files -- do with imageupload and base64 directive etc.
  // console.log('START', req.body.start.time);
  req.body.createdBy = req.user;

  Sprint
    .create(req.body)
    .then((sprint) => res.status(201).json(sprint))
    .catch(next);
}

function showRoute(req, res, next) {
  Sprint
    .findById(req.params.id)
    .populate('createdBy')
    .exec()
    .then((sprint) => {
      if(!sprint) return res.notFound();

      res.json(sprint);
    })
    .catch(next);
}

function updateRoute(req, res, next) {
  if(req.file) req.body.finish.img = req.file.filename;
  req.body.createdBy = req.user.id;
  req.body.finish.time = new Date();  // change this so it doesn't make a new finish time on each update.

  // req.body.duration = formattedDuration(req.body.start.time, req.body.finish.time);
  // function formattedDuration(time1, time2) {
  //   console.log('time1', time1);
  //   console.log('time2', time2);
  //   const duration = time1 - time2;
  //   console.log(duration);
  //   var secs = duration % 60;
  //   var minutes = Math.floor(duration % 3600 / 60);
  //   var hours = Math.floor(duration / 3600);
  //
  //   const total =  (hours ? (hours > 9 ? hours : '0' + hours) : '00') + ':' + (minutes ? (minutes > 9 ? minutes : '0' + minutes) : '00') + ':' + (secs > 9 ? secs : '0' + secs);
  //   console.log(total);
  //   return total;
  // }



  Sprint
    .findById(req.params.id)
    .exec()
    .then((sprint) => {
      if(!sprint) return res.notFound();

      for(const field in req.body) {
        sprint[field] = req.body[field];
      }

      return sprint.save();
    })
    .then((sprint) => res.json(sprint))
    .catch(next);
}

function deleteRoute(req, res, next) {
  Sprint
    .findById(req.params.id)
    .exec()
    .then((sprint) => {
      if(!sprint) return res.notFound();

      return sprint.remove();
    })
    .then(() => res.status(204).end())
    .catch(next);
}

module.exports = {
  index: indexRoute,
  create: createRoute,
  show: showRoute,
  update: updateRoute,
  delete: deleteRoute
};
