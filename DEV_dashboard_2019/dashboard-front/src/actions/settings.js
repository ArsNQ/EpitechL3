import {DELETE_LOCATION, ADD_LOCATION, UPDATE_SERVICE} from "../types";
import {openNotification} from "./notifications";

export const deleteLocation = (id, code) => dispatch =>  {
    fetch(`${process.env.REACT_APP_API_URL}/settings/weatherLocation/${id}/${code}`, {
        method: 'DELETE'
    }).then(res => res.json())
        .then(res => {
            console.log(res);
            return dispatch({
                type: UPDATE_SERVICE,
                payload: res
            })
        })
        .catch(err => console.log(err));
};

export const addlocation = (id, location) => dispatch => {
    if (!location) {
        throw openNotification({
            type: 'error',
            message: "A city is mandatory "
        })
    }

    return fetch(`${process.env.REACT_APP_API_URL}/settings/weatherLocation/${id}`, {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json',
        }),
        body: JSON.stringify(location)
    })
        .then(async res => {
            if (res.status === 200) return res.json();
            throw  await res.json();
        })
        .then(res => {
            console.log(res);
            return dispatch({
                type: UPDATE_SERVICE,
                payload: res
            })
        })
        .catch(err => {
            openNotification({
                type: 'error',
                message: err.message
            })});
};

export const changeState = (body) => dispatch => {
    fetch(`${process.env.REACT_APP_API_URL}/settings/changeService`, {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json',
        }),
        body: JSON.stringify(body)
    })
        .then(async res => {
            if (res.status === 200) return res.json();
            throw  await res.json();
        })
        .then(res => {
            return dispatch({
                type: UPDATE_SERVICE,
                payload: res
            })
        })
        .catch(err => {
            console.log(err);
            openNotification({
                type: 'error',
                message: err.message
            })});
};


export const addNewsCountry = (id, location) => dispatch => {
    if (!location) {
        throw openNotification({
            type: 'error',
            message: "A Country is mandatory "
        })
    }

    return fetch(`${process.env.REACT_APP_API_URL}/settings/newsLocation/${id}`, {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json',
        }),
        body: JSON.stringify(location)
    })
        .then(async res => {
            console.log(res)
            if (res.status === 200) return res.json();
            throw  await res.json();
        })
        .then(res => {
            return dispatch({
                type: UPDATE_SERVICE,
                payload: res
            })
        })
        .catch(err => {
            openNotification({
                type: 'error',
                message: err.message
            })});
};

export const deleteNewsLocation = (id, code) => dispatch =>  {
    fetch(`${process.env.REACT_APP_API_URL}/settings/newsLocation/${id}/${code}`, {
        method: 'DELETE'
    }).then(res => res.json())
        .then(res => {
            return dispatch({
                type: UPDATE_SERVICE,
                payload: res
            })
        })
        .catch(err => console.log(err));
};
