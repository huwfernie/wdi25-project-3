function adminRoute(req, res, next) {
  console.log('adminRoute');
  console.log(req.user);

  if(req.user.email !== 'a@a.com') {
  //  console.log('unauthorized');
    req.user.isAdmin = false;
    return res.unauthorized();
  }

  req.user.isAdmin = true;

  return next();
}

module.exports = adminRoute;
