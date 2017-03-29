const router = require('express').Router();

const users = require('../controllers/users');
const tracks = require('../controllers/tracks');
const sprints = require('../controllers/sprints');
const auth = require('../controllers/auth');

const imageUpload = require('../lib/imageUpload');
const secureRoute = require('../lib/secureRoute');
const adminRoute = require('../lib/adminRoute');

// ------ Sprints ------ //
router.route('/sprints')
  .all(secureRoute)
  .get(adminRoute, sprints.index)
  .post(imageUpload, sprints.create);

router.route('/sprints/:id')
  .all(secureRoute)
  .get(sprints.show)
  .put(imageUpload, sprints.update)
  .delete(sprints.delete);

// ------ Tracks ------ //
router.route('/tracks')
  .get(tracks.index)
  .post(secureRoute, tracks.create);

router.route('/tracks/:id')
  .get(tracks.show)
  .put(secureRoute, tracks.update)
  .delete(secureRoute, tracks.delete);

// ------ Users ------ //
router.route('/users')
  .get(users.index) // admin route
  .post(users.create);

router.route('/users/:id')
  .get(users.show) // admin route???
  .put(secureRoute, users.update)
  .delete(secureRoute, users.delete);

// ------ Login / Register ------ //
router.route('/register')
  .post(auth.register);

router.route('/login')
  .post(auth.login);

router.all('/*', (req, res) => res.notFound());

module.exports = router;
