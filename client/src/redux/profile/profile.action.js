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
//create or update profile
export const createProfile = (formData, history, edit = false) => async (
  dispatch
) => {
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
    if (!edit) {
      history.push("/dashboard");
    }
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
