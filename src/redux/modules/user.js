import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import apis from "../../shared/apis";

// action
const LOG_IN = "LOG_IN";
const LOG_OUT = "LOG_OUT";

// action creator
const login = createAction(LOG_IN, (payload) => ({ payload }));
const logout = createAction(LOG_OUT, (payload) => ({ payload }));

// initialstate
const initialstate = {
  is_login: false,
};

// middleware

// middleware-로그인
const loginMW = (userId, password) => {
  console.log(userId, password);
  // return function (dispatch, getState, { history }) {
  //   apis.login(userId, password).then((res) => {});
  // };
};

// reducer
export default handleActions(
  {
    [LOG_IN]: (state, action) =>
      produce(state, (draft) => {
        console.log(action);
      }),
  },
  initialstate
);

// export actionCreators
const actionCreators = {
  login,
  loginMW,
  logout,
};

export { actionCreators };
