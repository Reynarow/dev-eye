import { profileActionTypes } from "./profile.types";

const INITIAL_STATE = {
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
  error: {},
};

const profileReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case profileActionTypes.START_PROFILE:
      return{
        ...state,
        loading:true
      }

    case profileActionTypes.GET_PROFILE:
    case profileActionTypes.UPDATE_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
      };
case profileActionTypes.GET_PROFILES:
  return {
    ...state,
    profiles:payload,
    loading:false
  }
    case profileActionTypes.PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case profileActionTypes.CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        repos: [],
        loading: false,
      };
    default:
      return state;
      case profileActionTypes.GET_REPOS:
        return{
          ...state,
          repos:payload,
          loading:false
        }
  }
 
};

export default profileReducer;
