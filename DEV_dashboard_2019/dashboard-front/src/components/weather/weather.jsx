import React, {useEffect, useState} from "react";
import {createUseStyles} from 'react-jss';
import style from './weather_styles';
import {TextField} from "../../design_system/text_field/text_field";
import WeatherCard from "../weatherCard/weatherCard";

const useStyles = createUseStyles(style);

const Weather = () => {
    const classes = useStyles();
    const [Weather, setWeather] = useState();
    const [City, setCity] = useState("");
    const [Result, setResult] = useState();
    const [CityName, setCityName] = useState("");
    const [CityResult, setCityResult] = useState();

    useEffect(() => {
        console.log(process.env.REACT_APP_API_URL);
    }, []);

    const organizeData = (res) => {
        console.log(res)
        const weatherByDay = [];
        console.log("res = ", res.DailyForecasts);
        for (const element of Object.entries(res.DailyForecasts)) {
            const day = {};
            const date = new Date(element[1].Date);
            if (date.getMonth() + 1 < 10)
                day.date = date.getDate()+"/0"+(date.getMonth()+1)+"/"+date.getFullYear();
            else
                day.date = date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear();
            day.icon = element[1].Day.Icon;
            day.string = element[1].Day.ShortPhrase;
            day.minTemp = element[1].Temperature.Minimum.Value;
            day.maxTemp = element[1].Temperature.Maximum.Value;
            weatherByDay.push(day);
        }
        setWeather(weatherByDay);
    };

    const handleClikCity = (id, name) => {
        console.log(id);
        setCityName(name);
        fetch(`https://dataservice.accuweather.com//forecasts/v1/daily/5day/${id}?apikey=${process.env.REACT_APP_API_KEY_WEATHER}&language=fr&details=true&metric=true`)
            .then(res => res.json())
            .then(res => organizeData(res))
            .catch(err => console.log(err));
    };

    const generateList = () => {
        console.log(Result);
        let items = [];
        let id = 0;
        for (const key of Object.entries(Result)) {
            console.log(key[1]);
            items.push(<div onClick={e => handleClikCity(e.target.title, key[1].LocalizedName)} title={key[1].Key} key={id}
                            className={classes.CityItem}>{key[1].LocalizedName} / {key[1].AdministrativeArea.ID}</div>);
            id++;
        }
        return (items);
    };

    const handleClick = () => {
        console.log("City", City);
        fetch(`http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${process.env.REACT_APP_API_KEY_WEATHER}&q=${City}&language=fr`)
            .then(res => res.json())
            .then(res => setResult(res))
            .catch(err => console.log(err));
    };

    return (
        <div className={classes.Core}>
            <p className={classes.Text}>Your Weather</p>
            <TextField placeholder={"search for city"} value={City} onChange={e => setCity(e.target.value)}/>
            <button className={classes.Button} onClick={handleClick}>Search</button>
            {Result && generateList()}
            <div className={classes.Core}>
                <div className={classes.Text}>{CityName && <h2>Météo à {CityName}</h2>}</div>
                <div className={classes.cards}>
                    {Weather && Weather.map(value => (
                        <WeatherCard infos={value}/>
                    ))}
                </div>
            </div>

        </div>
    )
};

export default Weather;
