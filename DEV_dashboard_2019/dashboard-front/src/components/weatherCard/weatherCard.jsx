import React, {useEffect, useState} from "react";
import {createUseStyles} from 'react-jss';

import style from './weatherCard_styles';

const useStyles = createUseStyles(style);

const WeatherCard = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.Desc}>
            <h3>{props.infos.date}</h3>
            <img src={process.env.PUBLIC_URL + '/icon_weather/'+props.infos.icon+'-s.png'} />
            <h5 className={classes.Desc}>{props.infos.string}</h5>
            <div className={classes.temp}>
                <span style={{color: 'blue'}}>{props.infos.minTemp}°C</span>
                <span style={{color: 'red'}}> {props.infos.maxTemp}°C</span>
            </div>
        </div>
    )
};

export default WeatherCard;