/**
 * @param {Object} app - The application instance.
 */

module.exports = function(app) {
  var index = require('../controllers/server');
  app.get('/', index.render);
};
