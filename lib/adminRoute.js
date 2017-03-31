function adminRoute(req, res, next) {
  if(req.user.email !== 'a@a.com') {
    req.user.isAdmin = false;
    return res.unauthorized();
  }

  req.user.isAdmin = true;

  return next();
}

module.exports = adminRoute;
