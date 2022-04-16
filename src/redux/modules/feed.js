import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import api from "../../shared/api";
import axios from "axios";

// action
const SET_FEED = "SET_FEED";

// action creator
const set = createAction(SET_FEED, (payload) => ({ payload }));

// initialState
const initialState = {
  list: [],
  follow_list: [],
};

// middleware
const getFeed = () => {
  return async function (dispatch, getState) {
    const token = localStorage.getItem("token");

    try {
      const { data } = await api.get("/api/feed");
      console.log(data);
      dispatch(set(data));
    } catch {
      alert("데이터를 불러오지 못했습니다.");
    }
  };
};

// reducer
export default handleActions({
  [SET_FEED]: (state, action) =>
    produce(state, (draft) => {
      console.log("SET_FEED state", state);
      console.log("SET_FEED action", action);
      // draft.list = action.payload
    }),
});

const actionCreators = {
  getFeed,
};

export { actionCreators };
