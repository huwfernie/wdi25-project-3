// no idea if this will work!

function adminRoute(req, res, next) {

  if(req.user.username !== 'Tom') return res.unauthorized();

  res.json({ message: 'welcome back Tom' })
  .catch(next);
}


module.exports = adminRoute;
