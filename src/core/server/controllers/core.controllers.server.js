/**
 * @param {Object} req - Request.
 * @param {Object} res - Response.
 */

exports.render = function(req, res) {
  res.render('index', {
    title: 'Hello World'
  });
};
