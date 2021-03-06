import axios from "axios";
import { FETCH_USER } from "./types";
import { UPDATE_CATEGORY } from "./types";
// import { FETCH_SURVEYS } from "./types";

export const fetchUser = () => async (dispatch) => {
  const res = await axios.get("/api/current_user");
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const handleToken = (token) => async (dispatch) => {
  const res = await axios.post("/api/stripe", token);
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const updateCategory = (category) => (dispatch) => {
  dispatch({ type: UPDATE_CATEGORY, category: category });
};

// export const submitSurvey = (values, history) => async (dispatch) => {
//   const res = await axios.post("/api/surveys", values);
//   history.push("/surveys");
//   dispatch({ type: FETCH_USER, payload: res.data });
// };

// export const fetchSurveys = () => async (dispatch) => {
//   const res = await axios.get("/api/surveys");
//   dispatch({ type: FETCH_SURVEYS, payload: res.data });
// };
