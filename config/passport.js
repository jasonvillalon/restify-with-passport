'use strict';

var passport = require('passport'),
    User = require('../app/models/user.server.model'),
	  path = require('path'),
	  config = require('./config');

module.exports = function() {
	// Serialize sessions
	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	// Deserialize sessions
	passport.deserializeUser(function(id, done) {
    User.find({id: id}).success(function(user){
      return done(null, user);
    });
	});

	// Initialize strategies
	config.getGlobbedFiles('./config/strategies/**/*.js').forEach(function(strategy) {
		require(path.resolve(strategy))();
	});
};
