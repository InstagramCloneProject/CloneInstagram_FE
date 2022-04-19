import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import { apis } from "../../shared/apis";
import jwtDecode from "jwt-decode";
import { history } from "../configureStore";

// action
const LOG_IN = "LOG_IN";
const LOG_OUT = "LOG_OUT";
const JOIN = "JOIN";

// action creator
const login = createAction(LOG_IN, (payload) => ({ payload }));
const logout = createAction(LOG_OUT);
const join = createAction(JOIN, (payload) => ({ payload }));

// initialState
const initialstate = {
  is_login: false,
  userId: "",
  nickName: "",
  user: [],
};

// middleware
const __login = (payload) => (dispatch, getState) => {
  console.log(payload);
  apis
    .login(payload)
    .then((response) => {
      console.log("로그인 response", response);

      const atoken = response.data.accessToken;
      const rtoken = response.data.refreshToken;
      localStorage.setItem("access_token", atoken);
      localStorage.setItem("refresh_token", rtoken);

      const decodedToken = jwtDecode(atoken);
      console.log(decodedToken);

      const { userId, nickName, profileImg, user_Id } = jwtDecode(atoken);

      localStorage.setItem("userId", userId);
      localStorage.setItem("nickName", nickName);
      localStorage.setItem("profileImgUrl", profileImg);
      localStorage.setItem("user_Id", user_Id);
      dispatch(login({ userId: userId, nickName: nickName, user_Id: user_Id }));
      history.replace("/main");
    })
    .catch((error) => {
      console.log(error);
      // alert(error.response.data.message);
    });
};

const __logout = () => (dispatch, getState) => {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("nickName");
  dispatch(logout());
  history.replace("/");
};

const __join = (payload) => (dispatch, getState) => {
  console.log(payload);
  apis
    .join(payload)
    .then((response) => {
      console.log(response);
      alert(response.data.message);
      history.replace("/");
    })
    .catch((error) => {
      alert(error.response.data.message);
    });
};

// reducer
export default handleActions(
  {
    [LOG_IN]: (state, action) =>
      produce(state, (draft) => {
        console.log("로그인 state", state);
        console.log("로그인 action", action);
        draft.userId = action.payload.payload.userId;
        draft.nickName = action.payload.payload.nickName;
        draft.is_login = true;
      }),
    [LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        draft.userId = null;
        draft.nickName = null;
        draft.is_login = false;
      }),
  },
  initialstate
);

const actionCreators = {
  login,
  __login,
  logout,
  __logout,
  join,
  __join,
};

export { actionCreators };
