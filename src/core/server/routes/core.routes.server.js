/**
 * @param {Object} app - The application instance.
 */

module.exports = function(app) {
  var index = require('../controllers/core.controllers.server');
  app.get('/', index.render);
};
