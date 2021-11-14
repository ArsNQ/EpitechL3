import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import session from "express-session";
import http from "http";
import {v4 as uuidv4} from 'uuid';
import connectMongo from "connect-mongo";
import mongoose from 'mongoose';
import passport from "passport";
import './config/passport';

import authController from './controllers/authController';
import newsController from './controllers/newsController';
import settingsController from './controllers/settingsController';
import request from "request";
import queryString from "query-string";

const PORT = 8081;

const app = express();
const server = http.Server(app);
const MongoStore = connectMongo(session);
dotenv.config();
const {DB_HOST, DB_USER, DB_PASSWORD, DB_PORT, DB_BDD, DB_HOST_DEV} = process.env;

mongoose.connect(`mongodb://${DB_USER}:${DB_PASSWORD}@${process.env.NODE_ENV === "production" ? DB_HOST : DB_HOST_DEV}:${DB_PORT}/${DB_BDD}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(express.json());
app.use(cors({credentials: true, origin: true, exposedHeaders: ['x-auth-token']}));
app.use(session({
    genid: (req) => uuidv4(),
    store: new MongoStore({mongooseConnection: mongoose.connection}),
    secret: 'dashboard salt',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use('/auth', authController);
app.use('/news', newsController);
app.use('/settings', settingsController);


app.get("/", (req, res) => {
    res.json({ message: "API Working" });
});

server.listen(PORT, function(){
    console.log(`Server running on port: ${PORT}`);
});
