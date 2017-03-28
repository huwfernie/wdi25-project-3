const router = require('express').Router();

const users = require('../controllers/users');
const tracks = require('../controllers/tracks');
const sprints = require('../controllers/sprints');
const auth = require('../controllers/auth');

const imageUpload = require('../lib/imageUpload');
const googleVision = require('../lib/googleVision');
// const googVision = require('../lib/googVision');
// const secureRoute = require('../lib/secureRoute');
// const adminRoute = require('../lib/adminRoute');

// ------ Sprints ------ //
router.route('/sprints')
  .get(sprints.index)
  .post(imageUpload, googleVision, sprints.create);

router.route('/sprints/:id')
  .get(sprints.show)
  .put(imageUpload, sprints.update)
  .delete(sprints.delete);

// ------ Tracks ------ //
router.route('/tracks')
  .get(tracks.index)
  .post(tracks.create);

router.route('/tracks/:id')
  .get(tracks.show)
  .put(tracks.update)
  .delete(tracks.delete);

// ------ Users ------ //
router.route('/users')
  .get(users.index)
  .post(users.create);

router.route('/users/:id')
  .get(users.show)
  .put(users.update)
  .delete(users.delete);

// ------ Login / Register ------ //
router.route('/register')
  .post(auth.register);

router.route('/login')
  .post(auth.login);

router.all('/*', (req, res) => res.notFound());

module.exports = router;
