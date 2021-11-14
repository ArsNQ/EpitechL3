const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcrypt-nodejs");
const passport = require("passport");
const request = require("request");
const axios = require("axios");
const queryString = require("query-string")
const router = new express.Router();
const TwitterTokenStrategy = require("passport-twitter-token")

router.get('/auth', (req, res) => {
    console.log("auth",req.isAuthenticated())
    if (req.isAuthenticated()) {
        res.send({
            isAuth: true,
            user: req.user
        })
    } else {
        res.status(401).send({
            isAuth: false
        })
    }
});


passport.use(new TwitterTokenStrategy({
        consumerKey: 'Rr5pY03N3mbFOjnP4XXLd1EMH',
        consumerSecret: 'zWTeeKcUsUORg6BF72gujrL35QJRGVLN1t7IekSfyPc9Lr48hv'
    }, (token, tokenSecret, profile, done) => {
        return User.findOne({twitter_id: profile.id}, function (err, foundUser) {
            if (err) {
                return done(err);
            }
            if (!foundUser) {
                return User.create({
                    username: profile.displayName,
                    twitter_id: profile.id,
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

router.post('/login', (req, res, next) => {
    return passport.authenticate('local', (err, user, info) => {
        if (info) {
            return res.status(401).send(info)
        }
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.redirect('/auth');
        }
        return req.login(user, (err) => {
            if (err) {
                console.log("err", err);
                return next(err);
            }
            return res.send({
                data: user
            });
        })
    })(req, res, next);
});

router.post('/register', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const username = req.body.username;
    User.findOne({ email: email }, function(err, foundUser) {
        if (err) {
            return res.status(500).send({ message: "Internal server error" });
        } else if (foundUser) {
            return res.status(409).send({ message: "User already exist" });
        } else {
            bcrypt.genSalt(10, function(err, salt) {
                console.log("salt", salt, password);
                bcrypt.hash(password, salt, null, function(err, passwordHash) {
                    if (err) {
                        console.log(err)
                    }
                    User.create([{
                        email,
                        password: passwordHash,
                        username
                    }], function(err) {
                        if (err) {
                            console.log("err", err);
                            res.status(500).send({ message: "Internal server error" })
                        }else{
                            res.status(201).send({ message: "User created with success" });
                        }
                    })
                });
            });
        }
    });
});

router.get('/logout', (req, res) => {
    req.logout();
    res.send({ message: "Successfully logout" });
});

router.get('/token-twitter', (req, res) => {
    return request.post({
        url: 'https://api.twitter.com/oauth/request_token',
        oauth: {
            consumer_key: "Rr5pY03N3mbFOjnP4XXLd1EMH",
            consumer_secret:"zWTeeKcUsUORg6BF72gujrL35QJRGVLN1t7IekSfyPc9Lr48hv"
        }
    }, function (err, r, response) {
        if (err) {
            return res.status(500).send( { message: err.message });
        }
        const parsedRes = queryString.parse(response);
        return res.send(parsedRes);
    });
});

router.post('/login-twitter', (req, res, next) => {
    return request.post({
        url: 'https://api.twitter.com/oauth/access_token',
        oauth: {
            consumer_key: "Rr5pY03N3mbFOjnP4XXLd1EMH",
            consumer_secret: "zWTeeKcUsUORg6BF72gujrL35QJRGVLN1t7IekSfyPc9Lr48hv",
            token: req.body.oauth_token,
            verifier: req.body.oauth_verifier
        }
    }, function (err, r, response) {

        if (err) {
            return res.send( { message: err.message });
        }
        const parsedRes = queryString.parse(response);

        req.body['oauth_token'] = parsedRes.oauth_token;
        req.body['oauth_token_secret'] = parsedRes.oauth_token_secret;
        req.body['user_id'] = parsedRes.user_id;

        return passport.authenticate('twitter-token', (err, user, info) => {
            if (info) {
                return res.status(401).send(info)
            }
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.status(401).send({message: "Couldn't auth user"});
            }
            return req.login(user, (err) => {
                if (err) {
                    return next(err);
                }
                return res.send({
                    data: user
                });
            })
        })(req, res, next);
    });});

module.exports = router;