import { combineReducers } from 'redux';
import user from './user';
import service from './service';
import dashboard from './dashboard';
import weather from "./weather";
import news from "./news";

const rootReducer = combineReducers({
    user,
    service,
    dashboard,
    weather,
    news
});

export default rootReducer;

