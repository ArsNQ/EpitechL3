import {ADD_NEWS} from "../types";

const initialState = {

};

const news = (state = initialState, action) => {
    switch (action.type) {
        case ADD_NEWS:
            const {code, data} = action;
            return({
                ...state,
                [code] : data
            });

        default:
            return state
    }
};

export default news;
