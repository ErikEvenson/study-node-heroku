var passport = require('passport');

module.exports = function(app) {
  var
    usersController = require('../controllers/users');

  app.route('/users/signup')
    .get(usersController.renderSignup)
    .post(usersController.signup);

  app.route('/users/signin')
    .get(usersController.renderSignin)
    .post(passport.authenticate(
      'local',
      {
        successRedirect: '/',
        failureRedirect: '/users/signin',
        failureFlash: true
      }
    ));

  app.get('/users/signout', usersController.signout);
};
