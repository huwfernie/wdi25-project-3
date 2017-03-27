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
  if(req.file) req.body.start.img = req.file.filename;
  // image files -- do with imageupload and base64 directive etc.

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
  if(req.file) req.body.image = req.file.filename;

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
