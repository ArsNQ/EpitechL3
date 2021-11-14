import React from "react";
import {createUseStyles} from 'react-jss';
import style from './news_styles';
import {useNews} from "../../../hooks/useNews";
import {Card} from "../../../design_system/card/card";

const useStyles = createUseStyles(style);

const News = ({ data :{country, code}}) => {
    const classes = useStyles();
    const news = useNews(code);

    if (!news) {
        return null;
    }
    return (
        <Card className={classes.container}>
            <span className={classes.title}>News {country}</span>
            <div className={classes.articles}>
            {news.map((article, index) => (
                <>
                <div key={`${country}-${index}`} className={classes.article}>
                    <div className={classes.myTitle}>{article.title}</div>
                    {article.urlToImage && <img className={classes.myImg} src={article.urlToImage} />}
                    <div className={classes.info}>
                        <div className={classes.myAuthor}>{article.source.name}</div>
                        <a className={classes.myArticle} target={"_blank"} href={article.url}>Article Here</a>
                    </div>
                </div>
                    {(index !== news.length -1) && <div className={classes.divider} />}
                </>
            ))}
            </div>
        </Card>
    );

};

export default News;
