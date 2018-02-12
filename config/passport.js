const User = require('../models/user');
const LocalStrategy = require('passport-local').Strategy;

module.exports = (passport) => {
  // Serialize user
  passport.serializeUser((user, done) => {
    done(null, user.local);
  });
  // Deserialize user
  passport.deserializeUser((user, done) => {
    User.findOne({ 'user.username': username }, (err, usr) => {
      if (err) {
        return done(err);
      }
      done(null, usr.local);
    });
  });

  // Passport local signup strategy
  passport.use('signup', new LocalStrategy({
    passReqToCallback: true
  },
  (req, username, password, done) => {
    // Check if username already exists
    User.findOne({ 'local.username': username }, (err, user) => {
      // Handle error
      if (err) {
        console.log('Error in signup' + err);
        return done(err);
      }
      // If user already exists
      if (user) {
        console.log('User already exists');
        return done(null, false);
      } else {
        // Create a new user
        const newUser = User();
        newUser.local.username = username;
        newUser.local.password = newUser.hashPassword(password);
        // Save the new user
        newUser.save((err) => {
          if (err) {
            console.log('Error in saving user ' + err);
            throw err;
          }
          console.log('User signup successful');
          return done(null, newUser);
        });
      };
    });
  }));

  // Passport local login strategy
  passport.use('login', new LocalStrategy({
    passReqToCallback: true
  },
  (req, username, password, done) => {
    // Find user by username if user exists
    User.findOne({ 'local.username': username }, (err, user) => {
      // Handle error
      if (err) {
        done(err);
      }
      // If user doesn't esist
      if (!user) {
        console.log('User not found with username');
        return done(null, false);
      }
      // If user the user exists but the password is not valid
      if (!user.checkPasswordValidation(password)) {
        console.log('Password is NOT valid');
        return done(null, false);
      }
      // If user exists and the password is valid
      return done(null, user);
    });
  }));
};
