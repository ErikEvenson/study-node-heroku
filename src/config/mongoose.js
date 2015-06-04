var
  environment = require('./environment'),
  mongoose = require('mongoose');

/**
 * @return {Function} db - The database.
 */
module.exports = function() {
  var db = mongoose.connect(environment.db);

  require('../core/server/models/core.models.users');

  // Close the Mongoose connection on Control+C
  process.on('SIGINT', function() {
    mongoose.connection.close(function() {
      console.log('Mongoose default connection disconnected.');
      process.exit(0);
    });
  });

  return db;
};
