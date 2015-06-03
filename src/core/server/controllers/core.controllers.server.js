/**
 * @param {Object} req - Request.
 * @param {Object} res - Response.
 */

exports.render = function(req, res) {
  res.render('core.views.index.jade', {
    title: 'Hello World'
  });
};
