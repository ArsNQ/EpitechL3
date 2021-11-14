import express from 'express';
import NewsApi from 'newsapi';

const router = new express.Router();
const newsapi = new NewsApi('d68768813d4a430cbaa59fb5906be982');

router.get('/:country', (req, res) => {
    newsapi.v2.topHeadlines({ language: 'fr', country: req.params.country }).then((news) => {
        res.status(200).json({
            success: true,
            message: 'News fetched',
            news: news
        })
    })
});



export default router;