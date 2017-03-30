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
  .get(sprints.index)
  .post(imageUpload, sprints.create);

router.route('/sprints/:id')
  .all(secureRoute)
  .get(sprints.show)
  .put(imageUpload, sprints.update)
  .delete(sprints.delete);

// ------ Tracks ------ //
router.route('/tracks')
  .all(secureRoute)
  .get(tracks.index)
  .post(secureRoute, adminRoute, tracks.create);

router.route('/tracks/:id')
  .all(secureRoute)
  .get(tracks.show)
  .put(adminRoute, tracks.update)
  .delete(adminRoute, tracks.delete);

// ------ Users ------ //
router.route('/users')
  .get(secureRoute, adminRoute, users.index); // admin route

router.route('/users/:id')
  .all(secureRoute)
  .get(adminRoute, users.show) // admin route???
  .put(users.update)
  .delete(users.delete);

// ------ Login / Register ------ //
router.route('/register')
  .post(auth.register);

router.route('/login')
  .post(auth.login);

router.all('/*', (req, res) => res.notFound());

module.exports = router;
