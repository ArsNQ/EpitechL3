import {LOGIN, LOGOUT, UPDATE_CATEGORY} from "../types";

const initialState = {

};

const dashboard = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            if (action.payload?.dashboard) {
                return({
                    ...action.payload.dashboard
                })
            }
            return({});
        case UPDATE_CATEGORY:
            return({
                ...action.dashboard
            });
        case LOGOUT:
            return initialState;
        default:
            return state
    }
};

export default dashboard;
