import {useDispatch, useSelector} from "react-redux";
import {ADD_NEWS} from "../types";

export const useNews = (code) => {
    const dispatch = useDispatch();
    const newsData = useSelector(store => store.news[code]);
    if (!newsData) {
        fetch(`${process.env.REACT_APP_API_URL}/news/${code}`)
            .then(res => res.json())
            .then(({news}) => {
                return dispatch({
                    type: ADD_NEWS,
                    code,
                    data: news.articles,
                })
            })
            .catch(err => console.log(err));
    }

    return newsData;
};
