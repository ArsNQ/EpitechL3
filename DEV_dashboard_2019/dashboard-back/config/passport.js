import passport from "passport";
import {Strategy as LocalStrategy} from "passport-local";
import TwitterTokenStrategy from 'passport-twitter-token';
import bcrypt from "bcrypt-nodejs";
import dotenv from "dotenv";

dotenv.config();
const {TWITTER_CONSUMER_KEY, TWITTER_CONSUMER_SECRET} = process.env;

import users from './../models/Users';



passport.use(new LocalStrategy(
    {usernameField: 'email'},
    (email, password, done) => {
        // Find user in DB
        users.findOne({email: email}, function (err, foundUser) {
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
            return done(null, foundUser)
        });
    }
));



passport.use(new TwitterTokenStrategy({
        consumerKey: TWITTER_CONSUMER_KEY,
        consumerSecret: TWITTER_CONSUMER_SECRET
    }, (token, tokenSecret, profile, done) => {
        users.findOne({twitter_id: profile.id}, function (err, foundUser) {
            if (err) {
                return done(err);
            }
            if (!foundUser) {
                users.create({
                    name: profile.displayName,
                    twitter_id: profile.id,
                    accountType : 'twitter',
                }, function (err,newUser) {
                    if (err) {
                        done(err);
                    }
                    return done(null,newUser);
                })
            }
            return done(null, foundUser);
        });
    }
));

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser((id, done) => {
    users.findById(id, function (err, foundUser) {
        if (err) {
            return done(err, false)
        }
        return done(null, foundUser)
    });
});
