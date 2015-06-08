/**
 * @param {Object} req - Request.
 * @param {Object} res - Response.
 */

exports.render = function(req, res) {
  if (req.session.lastVisit) {
    console.log(req.session.lastVisit);
  }

  req.session.lastVisit = new Date();

  res.render('core.server.views.index.jade', {
    title: 'Hello World',
    user: JSON.stringify(req.user)
  });
};

exports.requiresLogin = function(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.status(401).send({
      message: 'User is not logged in'
    });
  }

  next();
};
