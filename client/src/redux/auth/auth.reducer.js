import { authActionType } from './auth.types';


const INITIAL_STATE = {
    token: localStorage.getItem('token'),
    isAuthenicated: null,
    loading: true,
    user: null
}


const authReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case authActionType.LOGIN_START:
            return {
                ...state,
                loading: true
            }

        case authActionType.REGISTER_SUCCESS:
        case (authActionType.LOGIN_SUCCESS):
            localStorage.setItem('token', action.payload.token)
            return {
                ...state,
                ...action.payload,
                isAuthenicated: true,
                loading: false
            }
        case (authActionType.USER_LOADED):

            return {
                ...state,
                isAuthenicated: true,
                loading: false,
                user: action.payload
            }
        case (authActionType.REGISTER_FAIL):
        case (authActionType.AUTH_ERROR):
        case authActionType.LOGIN_FAILURE:
        case authActionType.LOGOUT:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenicated: false,
                loading: false
            }


        default:
            return state
    }
}

export default authReducer;