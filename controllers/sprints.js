const Sprint = require('../models/sprint');

function indexRoute(req, res, next) {
  Sprint
    .find()
    // .populate('createdBy')
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
  console.log('START', req.body.start.time);
  req.body.createdBy = req.user;

  Sprint
    .create(req.body)
    .then((sprint) => res.status(201).json(sprint))
    .catch(next);
}

function showRoute(req, res, next) {
  Sprint
    .findById(req.params.id)
    // .populate('createdBy comments.createdBy')
    .exec()
    .then((sprint) => {
      if(!sprint) return res.notFound();

      res.json(sprint);
    })
    .catch(next);
}

function updateRoute(req, res, next) {
  console.log('update route BE');
  console.log(req.file);
  console.log('done');
  if(req.file) req.body.finish.img = req.file.filename;

  //if(!req.body.finish.time) req.body.finish.time = new Date();  // change this so it doesn't make a new finish time on each update.

  req.body.finish.time = new Date();  // change this so it doesn't make a new finish time on each update.

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
