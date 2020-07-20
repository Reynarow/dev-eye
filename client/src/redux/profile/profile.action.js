import axios from 'axios';

import { setAlert } from '../alert/alert.action';
import { profileActionTypes } from './profile.types';





//get current user profiles


export const getCurrentProfile = () => async dispatch => {

    try {
        const res = await axios.get('/api/profile/me');
        dispatch({
            type: profileActionTypes.GET_PROFILE,
            payload: res.data
        })
    } catch (error) {

        dispatch({
            type: profileActionTypes.PROFILE_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }

}
