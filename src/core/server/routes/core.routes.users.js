var usersController = require('../controllers/core.controllers.users');

/**
 * @param {Object} app - Application.
 */
module.exports = function(app) {
  app.route('/users').post(usersController.create);
};
