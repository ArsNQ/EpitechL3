import express from "express";
import Users from "../models/Users";
import bcrypt from "bcrypt-nodejs";

import passport from "passport";
import {cleanUser} from "../utils/functions";
import request from "request";
import queryString from 'query-string';

const router = new express.Router();

router.get('/', (req, res) => {
    if (req.isAuthenticated()) {
        res.send({
            isAuth: true,
            user: cleanUser(req.user)
        })
    } else {
        res.send({
            isAuth: false
        })
    }

router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (info) {
            return res.status(401).send(info)
        }
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.redirect('/auth');
        }
        req.login(user, (err) => {
            if (err) {
                return next(err);
            }
            return res.send({
                data: cleanUser(user)
            });
        })
    })(req, res, next);
});

router.post('/register', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    const location = req.body.location;
    Users.findOne({email: email}, function (err, foundUser) {
        if (err) {
            return res.status(500).send({message: "Internal server error"});
        } else if (foundUser) {
            return res.status(409).send({message: "User already exist"});
        } else {
            bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash(password, salt, null, function (err, passwordHash) {
                    if (err) {
                        console.log(err)
                    }
                    Users.create([{
                        email,
                        password: passwordHash,
                        name,
                        location,
                        service: {
                          weather: {
                              enabled: true,
                              locations: [location]
                          }
                        },
                        dashboard: {
                          weather: {
                              services: ['weather']
                          }
                        },
                        accountType : 'email'
                    }], function (err) {
                        if (err) {
                            res.status(500).send({message: "Internal server error"})
                        }
                        res.status(201).send({message: "User created with success"});
                    })
                });
            });
        }
    });
});

router.get('/logout', (req, res) => {
    req.logout();
    res.send({message: "Successfully logout"});
});


});

//      TWITTER

router.post('/twitter/reverse',(req, res) => {
    request.post({
        url: 'https://api.twitter.com/oauth/request_token',
        oauth: {
            oauth_callback: "http://127.0.0.1:3000/login",
            consumer_key: process.env.TWITTER_CONSUMER_KEY,
            consumer_secret: process.env.TWITTER_CONSUMER_SECRET
        }
    }, function (err, r, response) {
        if (err) {
            return res.send(500, { message: err.message });
        }
        const parsedRes = queryString.parse(response);
        res.send(parsedRes);
    });
});

router.post('/login-twitter',(req,res, next) => {
    return request.post({
        url: 'https://api.twitter.com/oauth/access_token?oauth_verifier',
        oauth: {
            oauth_callback: "http://51.91.254.200:8081/twitter/callback",
            consumer_key: process.env.TWITTER_CONSUMER_KEY,
            token: req.body.oauth_token,
            verifier: req.body.oauth_verifier
        }
    }, function (err, r, response) {
        if (err) {
            return res.send(500, { message: err.message });
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
            req.login(user, (err) => {
                if (err) {
                    return next(err);
                }
                return res.send({
                    data: cleanUser(user)
                });
            })
        })(req, res, next);
    });
});

export default router;
