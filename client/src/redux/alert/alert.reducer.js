import { alertActionTypes } from './alert.types'

const INITIAL_STATE = { alertObj: null }


const alertReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case alertActionTypes.SET_ALERT:
            return {
                ...state,
                alertObj: action.payload
            }
        case alertActionTypes.REMOVE_ALERT:
            return {
                ...state,
                alertObj: null
            }
        default:
            return state;
    }
}


export default alertReducer;