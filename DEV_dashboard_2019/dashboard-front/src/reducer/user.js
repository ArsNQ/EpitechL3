import {LOGIN, LOGOUT, REGISTER,DELETE_LOCATION, ADD_LOCATION} from "../types";
import Cookies from 'universal-cookie';

const cookies = new Cookies();


const initialState = {
    isAuth: false
};

const user = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:

            cookies.set('sess',true, {path: '/'});
            let user = JSON.parse(JSON.stringify(action.payload));
            delete user.service;
            delete user.dashboard;
            return({
                isAuth: true,
                ...user
            });
        case LOGOUT:
            cookies.remove('sess',{path: '/'});
            return initialState;

        default:
            return state
    }
};

export default user;
