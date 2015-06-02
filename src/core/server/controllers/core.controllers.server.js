/**
 * @param {Object} req - Request.
 * @param {Object} res - Response.
 */

exports.render = function(req, res) {
  res.send(['<p id="hello">', 'Hello World', '</p>'].join(''));
};
