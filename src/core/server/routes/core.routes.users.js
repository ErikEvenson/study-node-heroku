var usersController = require('../controllers/core.controllers.users');

/**
 * @param {Object} app - the application
 */
module.exports = function(app) {
  app.route('/users')
    .get(usersController.list)
    .post(usersController.create);

  app.route('/users/:userId')
    .delete(usersController.delete)
    .get(usersController.read)
    .put(usersController.update);

  app.param('userId', usersController.userByID);
};
