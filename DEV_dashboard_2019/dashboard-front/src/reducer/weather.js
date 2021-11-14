import {ADD_WEATHER} from "../types";

const initialState = {

};

const weather = (state = initialState, action) => {
    switch (action.type) {
        case ADD_WEATHER:
            const {code, data} = action;
            return({
                ...state,
                [code] : data
            });

        default:
            return state
    }
};

export default weather;
