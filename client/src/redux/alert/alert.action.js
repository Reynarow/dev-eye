import { alertActionTypes } from './alert.types';




export const setAlert = (msg, alertType) => dispatch => {

    dispatch({
        type: alertActionTypes.SET_ALERT,
        payload: { msg, alertType }
    });
    setTimeout(() => {
        dispatch({ type: alertActionTypes.REMOVE_ALERT })
    }, 5000);
}