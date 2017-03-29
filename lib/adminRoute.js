// const User = require('../models/user');
function adminRoute(req, res, next) {

  if(req.user.email !== 'admin@admin.com') return res.unauthorized();

  const isAdmin = true;

  res.json({ message: 'Welcome back Admin' })

  .catch(next);
}

module.exports = adminRoute;
