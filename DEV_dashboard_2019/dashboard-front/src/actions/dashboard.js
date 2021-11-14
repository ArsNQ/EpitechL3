import {UPDATE_CATEGORY} from "../types";
import {openNotification} from "./notifications";


export const addCategory = (category, services, _id) => dispatch => {
  return fetch(`${process.env.REACT_APP_API_URL}/settings/add_category`, {
      method: 'POST',
      credential: true,
      headers: new Headers({
          'Content-Type': 'application/json',
      }),
      body: JSON.stringify({
          category,
          services,
          _id
      })
  })
  .then(async (res) => {
      if (res.status === 200) return res.json();
      throw await res.json();
  })
  .then((res) => {
      const {dashboard, message} = res;
      dispatch({
          type: UPDATE_CATEGORY,
          dashboard
      });
      openNotification({
          type: 'success',
          message
      });
      return res;
  }).catch((err) => {
      console.log(err)
  })
};

export const deleteCategory = (category, _id) => dispatch => {
    return fetch(`${process.env.REACT_APP_API_URL}/settings/delete_category`, {
        method: 'POST',
        credential: true,
        headers: new Headers({
            'Content-Type': 'application/json',
        }),
        body: JSON.stringify({
            category,
            _id
        })
    })
        .then(async (res) => {
            if (res.status === 200) return res.json();
            throw await res.json();
        })
        .then((res) => {
            const {dashboard, message} = res;
            console.log(dashboard)
            dispatch({
                type: UPDATE_CATEGORY,
                dashboard
            });
            openNotification({
                type: 'success',
                message
            });
            return res;
        }).catch((err) => {
        console.log(err)
    })
};
