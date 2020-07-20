import axios from 'axios';
import { setAlert } from '../alert/alert.action';
import { authActionType } from './auth.types';
import { profileActionTypes } from '../profile/profile.types';
import setAuthToken from '../../utils/setAuthToken.utils';


const config = {
    headers: {
        'Content-Type': 'application/json'
    }
}
//Load user 
export const loadUser = () => async dispatch => {
    localStorage.token && setAuthToken(localStorage.token)
    try {
        const res = await axios.get('api/auth');

        dispatch({
            type: authActionType.USER_LOADED,
            payload: res.data
        })

    } catch (error) {
        dispatch({
            type: authActionType.AUTH_ERROR
        })
    }
}





//register user


export const register = ({ name, email, password }) => async dispatch => {


    const body = JSON.stringify({ name, email, password });

    try {
        const res = await axios.post('api/users', body, config);
        dispatch({
            type: authActionType.REGISTER_SUCCESS,
            payload: res.data
        })
        dispatch(loadUser())
    } catch (error) {
        const errors = error.response.data.errors;
        if (errors) {
            const errorMsg = errors[0].msg;
            dispatch(setAlert(errorMsg, 'danger'))
        }
        dispatch({
            type: authActionType.REGISTER_FAIL
        });
    }
}

//login user



export const login = ({ email, password }) => async dispatch => {

    dispatch({
        type: authActionType.LOGIN_START
    })
    const body = JSON.stringify({ email, password })
    try {
        const res = await axios.post('api/auth', body, config)

        dispatch({
            type: authActionType.LOGIN_SUCCESS,
            payload: res.data
        })

        dispatch(loadUser())
    } catch (error) {

        const errors = error.response.data.errors;
        if (errors) {
            const errorMsg = errors[0].msg;
            dispatch(setAlert(errorMsg, 'danger'))
        }

        dispatch({
            type: authActionType.LOGIN_FAILURE
        })


    }
}


//logout /clear Profile

export const logout = () => dispatch => {
    dispatch({ type: profileActionTypes.CLEAR_PROFILE })
    dispatch({ type: authActionType.LOGOUT })
}