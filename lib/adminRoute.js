const User = require('../models/user');

function adminRoute(req, res, next) {

  const isAdmin = true;

  if(req.user.username !== 'Admin') return res.unauthorized();

  res.json({ message: 'Welcome back Admin' })
  .catch(next);
}

module.exports = adminRoute;
