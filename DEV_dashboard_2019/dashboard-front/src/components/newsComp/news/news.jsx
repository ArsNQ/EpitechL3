import React, {useEffect, useState} from "react";
import {createUseStyles} from 'react-jss';
import style from './news_styles';
import NewsCard from "../newsCard/newsCard";

const useStyles = createUseStyles(style);

const News = (props) => {
    const classes = useStyles();
    const [country, setCountry] = useState("fr");
    const [News, setNews] = useState([]);

    var countrySelect = [
        ["ae", "United Arab Emirates"],
        ["ar", "Argentina"],
        ["at", "Austria"],
        ["au", "Australia"],
        ["be", "Belgium"],
        ["bg", "Bulgaria"],
        ["br", "Brazil"],
        ["ca", "Canada"],
        ["ch", "Switzerland"],
        ["cn", "China"],
        ["co", "Colombia"],
        ["cu", "Cuba"],
        ["cz", "Czech Republic"],
        ["de", "Germany"],
        ["eg", "Egypt"],
        ["fr", "France"],
        ["gb", "United Kingdom"],
        ["gr", "Greece"],
        ["hk", "Hong Kong"],
        ["hu", "Hungary"],
        ["id", "Indonesia"],
        ["ie", "Ireland"],
        ["il", "Israel"],
        ["in", "India"],
        ["jp", "Japan"],
        ["kr", "South Korea"],
        ["lt", "Lithuania"],
        ["lv", "Latvia"],
        ["ma", "Morocco"],
        ["mx", "Mexico"],
        ["my", "Malaysia"],
        ["ng", "Nigeria"],
        ["nl", "Netherlands"],
        ["no", "Norway"],
        ["nz", "New Zealand"],
        ["ph", "Philippines"],
        ["pl", "Poland"],
        ["pt", "Portugal"],
        ["ro", "Romania"],
        ["rs", "Serbia"],
        ["ru", "Russia"],
        ["sa", "Saudi Arabia"],
        ["se", "Sweden"],
        ["sg", "Singapore"],
        ["si", "Slovenia"],
        ["sk", "Slovakia"],
        ["th", "Thailand"],
        ["tr", "Turkey"],
        ["tw", "Taiwan"],
        ["ua", "Ukraine"],
        ["us", "United States"],
        ["ve", "Venezuela"],
    ];

const parseData = (res) => {
    setNews(res.news.articles);
};

function createOptions() {
    let items = [];
    countrySelect.forEach(value => {
        items.push(<option value={value[0]}>{value[1]}</option>)
    });
    return (items);
}

useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/news/${country}`)
        .then(res => res.json())
        .then(res => parseData(res))
        .catch(error => console.log(error));
}, [country]);

return (
    <div>
        <select className={classes.myBottom} onChange={e => setCountry(e.target.value)}>
            {createOptions()}
        </select>
        {News.map(article => (
            <NewsCard article={article} />
        ))}
    </div>
);

};

export default News;
