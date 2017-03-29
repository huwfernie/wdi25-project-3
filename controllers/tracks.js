const Track = require('../models/track');
const Sprint = require('../models/sprint');

function indexRoute(req, res, next) {
  Track
    .find()
    .exec()
    .then((tracks) => res.json(tracks))
    .catch(next);
}

function createRoute(req, res, next) {
  // if(req.file) req.body.start.img = req.file.filename;
  // image files -- do with imageupload and base64 directive etc.

  req.body.createdBy = req.user;

  Track
    .create(req.body)
    .then((track) => res.status(201).json(track))
    .catch(next);
}

function showRoute(req, res, next) {
  Track
    .findById(req.params.id)
    .exec()
    .then((track) => {

      if(!track) return res.notFound();

      Sprint.find({ track: track.id })
        .populate('createdBy')
        .sort('duration')
        .limit(10)
        .exec()
        .then((sprints) => {
          res.json({ track, sprints });
        });
    })
    .catch(next);
}

function updateRoute(req, res, next) {
  // if(req.file) req.body.image = req.file.filename;

  Track
    .findById(req.params.id)
    .exec()
    .then((track) => {
      if(!track) return res.notFound();

      for(const field in req.body) {
        track[field] = req.body[field];
      }

      return track.save();
    })
    .then((track) => res.json(track))
    .catch(next);
}

function deleteRoute(req, res, next) {
  Track
    .findById(req.params.id)
    .exec()
    .then((track) => {
      if(!track) return res.notFound();

      return track.remove();
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
