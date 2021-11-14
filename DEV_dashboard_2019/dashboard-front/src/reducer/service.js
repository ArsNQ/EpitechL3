import {ADD_LOCATION, DELETE_LOCATION, LOGIN, LOGOUT, UPDATE_SERVICE} from "../types";

const initialState = {

};

const service = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            if (action.payload?.service) {
                return({
                    ...action.payload.service
                })
            }
            return({});
        case LOGOUT:
            return initialState;
        case DELETE_LOCATION:
            console.log("delete_location");
            return ({
                ...action.payload
            });
        case ADD_LOCATION:
            console.log("add_location");
            return ({
                ...action.payload
            });
        case UPDATE_SERVICE:
            console.log("update service");
            return ({
                ...action.payload
            });
        default:
            return state
    }
};

export default service;
