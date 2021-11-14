import {useDispatch, useSelector} from "react-redux";
import {ADD_WEATHER} from "../types";

export const useWeather = (code) => {
    const dispatch = useDispatch();
    const weatherData = useSelector(store => store.weather[code]);
    if (!weatherData) {
        fetch(`https://dataservice.accuweather.com//forecasts/v1/daily/5day/${code}?apikey=${process.env.REACT_APP_API_KEY_WEATHER}&language=fr&details=true&metric=true`)
            .then(res => res.json())
            .then(res => {
                return dispatch({
                    type: ADD_WEATHER,
                    code,
                    data: getSmallData(res),
                })
            })
            .catch(err => console.log(err));
    }

    return weatherData;
};

const getSmallData = (res) => {
    const days = res.DailyForecasts.slice(0,3);
    return days.map(day => {
        return({
            date: day.Date,
            icon: day.Day.Icon,
            string: day.Day.ShortPhrase,
            minTemp: day.Temperature.Minimum.Value,
            maxTemp: day.Temperature.Maximum.Value,
        })
    })
};
