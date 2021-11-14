const passport = require('passport');
const Strategy = require('passport-local');
const bcrypt = require("bcrypt-nodejs");
const dotenv = require("dotenv");
const User = require('./../models/user');

passport.use(new Strategy({ usernameField: 'email' },
    (email, password, done) => {
        User.findOne({ email: email }, function(err, foundUser) {
            if (err) {
                console.log(err);
                return done(err);
            }
            if (!foundUser) {
                return done(null, false, { message: 'Invalid credentials.\n' });
            }
            if (!bcrypt.compareSync(password, foundUser.password)) {
                return done(null, false, { message: 'Invalid credentials.\n' })
            }
                // return jwt token
            return done(null, foundUser)
        });
    }
));

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, function(err, foundUser) {
        if (err) {
            return done(err, false)
        }
        return done(null, foundUser)
    });
});