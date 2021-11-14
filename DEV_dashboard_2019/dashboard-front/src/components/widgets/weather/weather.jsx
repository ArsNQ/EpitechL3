import React from "react";
import {createUseStyles} from 'react-jss';

import style from './weather_styles';
import {Card} from "../../../design_system/card/card";
import {useWeather} from "../../../hooks/useWeather";
import Loader from "react-loader-spinner";

const useStyles = createUseStyles(style);

const Weather = ({data: {code,city}}) => {
    const classes = useStyles();
    const weather = useWeather(code);
    if (!weather) {
        return(
            <Card className={classes.loader}>
                <Loader
                    type="TailSpin"
                    color="#00BFFF"
                    height={50}
                    width={50}
                />
            </Card>
        );
    }

    return (
            <Card className={classes.card}>
                <h2>Météo à {city}</h2>
                <div className={classes.row}>
                    {weather.map(({date, string, icon, minTemp, maxTemp}) => (
                        <div className={classes.Desc} key={`${city}-${date}`}>
                            <h3>{new Date(date).toLocaleString().slice(0, 10)}</h3>
                            <img src={`${process.env.PUBLIC_URL}/icon_weather/${icon}-s.png`} style={{width: 100, marginTop: 15}}/>
                            <span className={classes.description}>{string}</span>
                            <div className={classes.temp}>
                                <span style={{color: 'blue'}}>{minTemp}°C</span>
                                <span style={{color: 'red'}}> {maxTemp}°C</span>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
    )
};

export default Weather;
