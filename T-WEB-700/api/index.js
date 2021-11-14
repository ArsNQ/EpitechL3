const express = require("express");
const cors = require("cors");
const dotenv = require('dotenv');
const http = require("http");
const mongoose = require("mongoose");
const connectMongo = require('connect-mongo');
const session = require("express-session");
const cron = require("node-cron")
let Parser = require('rss-parser');
const passport = require('passport');
const Article = require('./models/article');

const {
    v4
} = require('uuid');

const articlesController = require('./controllers/article.controller');
const authController = require('./controllers/auth.controller');
const cryptoController = require('./controllers/crypto.controller');

const PORT = 8081;

const app = express();
const server = http.Server(app);
const MongoStore = connectMongo(session);
require('./config/auth');

dotenv.config();

const {
    DB_HOST,
    DB_USER,
    DB_PASSWORD,
    DB_BDD
} = process.env;

// to enable the new call (delete warning on the launch api) 
mongoose.set('useCreateIndex', true);

mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_BDD}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to DB");
}).catch(err => {
    console.error("Connection error", err);
    process.exit();
});

app.use(express.json());
app.use(cors({
    credentials: true,
    origin: true,
}));

app.use(session({
    genid: (req) => v4(),
    store: new MongoStore({
        mongooseConnection: mongoose.connection
    }),
    secret: 'salt',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/users', authController);
app.use('/cryptos', cryptoController);
app.use('/articles', articlesController);

app.get("/", (req, res) => {
    res.json({
        message: "API Working"
    });
});

server.listen(PORT, function () {
    console.log(`Server running on port: ${PORT}`);
});

// running a task every 5 minutes
cron.schedule('*/5 * * * *', () => {

    const URLFeeds = [
        `https://www.coindesk.com/feed`,
        `https://cryptopotato.com/feed`,
        `https://coincolony.net/feed/`,
        `https://minergate.com/blog/feed/`,
        `https://www.cryptoninjas.net/feed/`,
        `https://www.financemagnates.com/cryptocurrency/feed/`,
        `https://www.reddit.com/r/CryptoCurrency/top/.rss?format=xml`
    ]

    let parserFeed = new Parser();
    URLFeeds.forEach(async (URL) => {
        console.log(`Récupération d'article ${URL}`);
        let feed = await parserFeed.parseURL(URL);

        feed.items.forEach(item => {
            Article.findOne({
                link: item.link
            }, (err, article) => {
                if (article === null) {

                    const newArticle = new Article({
                        title: item.title,
                        content: item.contentSnippet,
                        link: item.link,
                        creator: item.creator || 'Anonymous',
                        isoDate: item.isoDate,
                        origin: feed.title
                    });

                    newArticle.save((err) => {
                        if (err !== null) {
                            console.log(err);
                        }
                    });

                    console.log(`saved article : ${item.title}`);
                }
            });
        });
    });
});