var User = require('mongoose').model('User');

/**
 * @param {Object} req - Request.
 * @param {Object} res - Response.
 * @param {Function} next - Next middleware.
 */
exports.create = function(req, res, next) {
  var user = new User(req.body);

  user.save(function(err) {
    if (err) {
      return next(err);
    } else {
      res.json(user);
    }
  });
};
