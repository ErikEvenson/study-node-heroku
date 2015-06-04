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

/**
 * @param {Object} req - Request.
 * @param {Object} res - Response.
 * @param {Function} next - Next middleware.
 */
exports.delete = function(req, res, next) {
  req.user.remove(function(err) {
    if (err) {
      return next(err);
    } else {
      res.json(req.user);
    }
  });
};

/**
 * @param {Object} req - Request.
 * @param {Object} res - Response.
 * @param {Function} next - Next middleware.
 */
exports.list = function(req, res, next) {
  User.find({}, 'username email', function(err, users) {
    if (err) {
      return next(err);
    } else {
      res.json(users);
    }
  });
};

/**
 * @param {Object} req - Request.
 * @param {Object} res - Response.
 */
exports.read = function(req, res) {
  res.json(req.user);
};

/**
 * @param {Object} req - Request.
 * @param {Object} res - Response.
 * @param {Function} next - Next middleware.
 */
exports.update = function(req, res, next) {
  User.findByIdAndUpdate(req.user.id, req.body, function(err, user) {
    if (err) {
      return next(err);
    } else {
      res.json(user);
    }
  });
};

/**
 * @param {Object} req - Request
 * @param {Object} res - Response
 * @param {Function} next - Next middleware
 * @param {Object} id - document id
 */
exports.userByID = function(req, res, next, id) {
  User.findOne({
    _id: id
  }, function(err, user) {
    if (err) {
      return next(err);
    } else {
      req.user = user;
      next();
    }
  });
};
