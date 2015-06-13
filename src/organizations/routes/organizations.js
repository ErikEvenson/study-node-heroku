var
  usersController = require('../../core/controllers/users'),
  organizationsController = require('../controllers/organizations');

module.exports = function(app) {
  app.route('/api/organizations')
    .get(organizationsController.list)
    .post(
      usersController.requiresLogin,
      organizationsController.create
    );

  app.route('/api/organizations/:organizationId')
    .get(organizationsController.read)
    .put(
      usersController.requiresLogin,
      organizationsController.hasAuthorization,
      organizationsController.update
    ).delete(
      usersController.requiresLogin,
      organizationsController.hasAuthorization,
      organizationsController.delete
    );

  app.param('organizationId', organizationsController.organizationByID);
};
