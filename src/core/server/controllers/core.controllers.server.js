/**
 * @param {Object} req - Request.
 * @param {Object} res - Response.
 */

exports.render = function(req, res) {
  if (req.session.lastVisit) {
    console.log(req.session.lastVisit);
  }

  req.session.lastVisit = new Date();

  res.render('core.views.index.jade', {
    title: 'Hello World',
    name: req.user ? req.user.name : ''
  });
};
