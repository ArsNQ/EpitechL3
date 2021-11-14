import React, {useEffect, useState} from "react";
import {createUseStyles} from 'react-jss';

import style from './newsCard_styles';

const useStyles = createUseStyles(style);

const NewsCard = (props) => {
    const classes = useStyles();

    return (
            <div className={classes.myCard}>
                <div className={classes.myTitle}>{props.article.title}</div>
                <img className={classes.myImg} src={props.article.urlToImage} />
                <div className={classes.myAuthor}>{props.article.source.name}</div>
                <a className={classes.myArticle} href={props.article.url}>Article Here</a>
            </div>
    )
};

export default NewsCard;