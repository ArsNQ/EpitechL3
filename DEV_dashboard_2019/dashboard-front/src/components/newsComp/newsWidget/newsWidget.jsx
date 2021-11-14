import React, {useEffect, useState} from "react";
import style from './newsWidget_styles';
import News from "../news/news";
import {createUseStyles} from "react-jss";

const useStyles = createUseStyles(style);


const NewsWidget = () => {
    const classes = useStyles();
    return (
        <div className={classes.myWidget}>
            <News/>
        </div>
    )
};

export default NewsWidget;