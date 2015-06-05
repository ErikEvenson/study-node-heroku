var passport = require('passport');

module.exports = function(app) {
  var
    usersController = require('../controllers/core.controllers.users');

  app.route('/signup')
    .get(usersController.renderSignup)
    .post(usersController.signup);

  app.route('/signin')
    .get(usersController.renderSignin)
    .post(passport.authenticate(
      'local',
      {
        successRedirect: '/',
        failureRedirect: '/signin',
        failureFlash: true
      }
    ));

  app.get('/signout', usersController.signout);
};
