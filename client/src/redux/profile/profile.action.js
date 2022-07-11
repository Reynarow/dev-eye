import axios from "axios";

import { setAlert } from "../alert/alert.action";
import { profileActionTypes } from "./profile.types";

//get current user profiles

export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/profile/me");
    dispatch({
      type: profileActionTypes.GET_PROFILE,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: profileActionTypes.PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

//Get all Profiles

export const getProfiles = () => async (dispatch) => {
  dispatch({type:profileActionTypes.CLEAR_PROFILE});
  try {
    const res = await axios.get("/api/profile");
    dispatch({
      type: profileActionTypes.GET_PROFILES,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: profileActionTypes.PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
//Get Profile by id 
export const getProfileById = (userId) => async (dispatch) => {

  try {
    const res = await axios.get(`/api/profile/user/${userId}`);
    dispatch({
      type: profileActionTypes.GET_PROFILE,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: profileActionTypes.PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

//Get Github repos

export const getGithubRepos = (username) => async (dispatch) => {

  try {
    const res = await axios.get(`/api/profile/github/${username}`);
    dispatch({
      type: profileActionTypes.GET_REPOS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: profileActionTypes.PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

//create or update profile
export const createProfile = (formData, history, edit = false) => async (
  dispatch
) => {
  dispatch({
    type:profileActionTypes.START_PROFILE
  })
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.post("/api/profile", formData, config);
    dispatch({
      type: profileActionTypes.GET_PROFILE,
      payload: res.data,
    });

    dispatch(
      setAlert(edit ? "پروفایل به روز شد" : "پروفایل ساخته شد", "success")
    );
    
      history.push("/dashboard");
   
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      const errorMsg = errors[0].msg;
      dispatch(setAlert(errorMsg, "danger"));
    }
    dispatch({
      type: profileActionTypes.PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

//Add Experience
export const addExprerience = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.put("/api/profile/experience", formData, config);
    dispatch({
      type: profileActionTypes.UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert("تجربه اضافه شد", "success"));
    history.push("/dashboard");
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      const errorMsg = errors[0].msg;
      dispatch(setAlert(errorMsg, "danger"));
    }
    dispatch({
      type: profileActionTypes.PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

//Add education

export const addEducation = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.put("/api/profile/education", formData, config);
    dispatch({
      type: profileActionTypes.UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert("تحصیلات آموزشی اضافه شد", "success"));
    history.push("/dashboard");
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      const errorMsg = errors[0].msg;
      dispatch(setAlert(errorMsg, "danger"));
    }
    dispatch({
      type: profileActionTypes.PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};


// Delete experience
export const deleteExperience = id =>async (dispatch) => {
  try {
      const res = await axios.delete(`/api/profile/experience/${id}`)
      dispatch({
        type:profileActionTypes.UPDATE_PROFILE,
        payload:res.data
      })
      dispatch(setAlert("تجربه کاری مورد نظر حذف شد",'success'))
  } catch (error) {
    dispatch({
      type: profileActionTypes.PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
}
// Delete education
export const deleteEducation = id =>async (dispatch) => {
  try {
      const res = await axios.delete(`/api/profile/education/${id}`)
      dispatch({
        type:profileActionTypes.UPDATE_PROFILE,
        payload:res.data
      })
      dispatch(setAlert("تحصیلات مورد نظر حذف شد",'success'))
  } catch (error) {
    dispatch({
      type: profileActionTypes.PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
}