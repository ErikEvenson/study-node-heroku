var
  mongoose = require('mongoose');

var
  Schema = mongoose.Schema;

var UserSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },

  email: {
    index: true,
    match: [
      /.+\@.+\..+/,
      'Please provide a valid e-mail address'
    ],
    type: String
  },

  firstName: String,
  lastName: String,

  password: {
    type: String,
    validate: [
      function(password) {
        return password && password.length > 6;
      }, 'Password should be longer'
    ]
  },

  role: {
    enum: ['user'],
    type: String
  },

  username: {
    required: true,
    type: String,
    trim: true,
    unique: true
  },

  website: {
    get: function(url) {
      if (!url) {
        return url;
      } else {
        if (url.indexOf('http://') !== 0 && url.indexOf('https://') !== 0) {
          url = 'http://' + url;
        }

        return url;
     }
    },

    set: function(url) {
      if (!url) {
        return url;
      } else {
        if (url.indexOf('http://') !== 0 && url.indexOf('https://') !== 0) {
          url = 'http://' + url;
        }

        return url;
        }
    },
    type: String
  }
});

/**
 * @param {String} password -- The password
 * @return {Boolean}
 * @this UserSchema
 */
UserSchema.methods.authenticate = function(password) {
  return this.password === password;
};

/**
 * @param {String} username
 * @param {Function} cb - A callback.
 * @this UserSchema
 */
UserSchema.statics.findOneByUsername = function(username, cb) {
  this.findOne({username: new RegEx(username, 'i')}, cb);
};

UserSchema.virtual('fullName').get(function() {
  return this.firstName + ' ' + this.lastName;
}).set(function(fullName) {
  var splitName = fullName.split(' ');
  this.firstName = splitName[0] || '';
  this.lastName = splitName[1] || '';
});

UserSchema.set('toJSON', {getters: true, virtuals: true});

mongoose.model('User', UserSchema);
