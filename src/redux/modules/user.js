import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import { apis } from "../../shared/apis";
import jwtDecode from "jwt-decode";
import { history } from "../configureStore";

// action
const LOG_IN = "LOG_IN";
const LOG_OUT = "LOG_OUT";
const JOIN = "JOIN";
const GET_USER = "GET_USER";
const EDIT_PROFILE_IMG = "EDIT_PROFILE_IMG";
const FOLLOW_USER = "FOLLOW_USER";

// action creator
const login = createAction(LOG_IN, (payload) => ({ payload }));
const logout = createAction(LOG_OUT);
const join = createAction(JOIN, (payload) => ({ payload }));
const getUser = createAction(
  GET_USER,
  (
    feeds,
    feedCount,
    follower,
    following,
    profile_userId,
    profile_nickName,
    profile_userProfileImg
  ) => ({
    feeds,
    feedCount,
    follower,
    following,
    profile_userId,
    profile_nickName,
    profile_userProfileImg,
  })
);
const editProfileImg = createAction(EDIT_PROFILE_IMG, (payload) => ({
  payload,
}));
const follow_user = createAction(FOLLOW_USER, (payload) => ({ payload }));

// initialState
const initialstate = {
  is_login: false,
  user: [],
  feeds: [],
  follower: "",
  following: "",
  feedCount: "",
  userId: "",
  nickName: "",
  profile_userId: "",
  profile_nickName: "",
  profile_userProfileImg: "",
  followCheck: false,
};

// middleware
const __login = (payload) => (dispatch, getState) => {
  console.log(payload);
  apis
    .login(payload)
    .then((response) => {
      const atoken = response.data.accessToken;
      const rtoken = response.data.refreshToken;
      localStorage.setItem("access_token", atoken);
      localStorage.setItem("refresh_token", rtoken);

      const { userId, nickName, profileImg, user_Id } = jwtDecode(atoken);

      localStorage.setItem("userId", userId);
      localStorage.setItem("nickName", nickName);
      localStorage.setItem("profileImgUrl", profileImg);
      localStorage.setItem("user_Id", user_Id);
      dispatch(login({ userId: userId, nickName: nickName, user_Id: user_Id }));
      history.replace("/main");
    })
    .catch((error) => {
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
      alert(response.data.message);
      history.replace("/");
    })
    .catch((error) => {
      alert(error.response.data.message);
    });
};

const __getUser = (payload) => (dispatch, getState) => {
  apis.getUser(payload).then((response) => {
    console.log(response);
    const feedCount = response.data.feedCount.count;
    const follower = response.data.follow.follower;
    const following = response.data.follow.following;
    const feeds = response.data.feeds;
    const profile_userId = response.data.user.userId;
    const profile_nickName = response.data.user.nickName;
    const profile_userProfileImg = response.data.user.userInfos[0].profileImg;
    console.log(
      "여기 확인해볼까?",
      feeds,
      feedCount,
      follower,
      following,
      profile_userId,
      profile_nickName,
      profile_userProfileImg
    );
    dispatch(
      getUser(
        feeds,
        feedCount,
        follower,
        following,
        profile_userId,
        profile_nickName,
        profile_userProfileImg
      )
    );
  });
};

const __follow =
  (__userId_storage, __profile_userId) => (dispatch, getState) => {
    console.log(__userId_storage, __profile_userId);
    apis
      .follow_user(__userId_storage, __profile_userId)
      .then((response) => {
        const resData = response.data.success;

        dispatch(follow_user(resData));
        window.location.reload();
      })
      .catch((error) => {
        alert("팔로우를 실패했습니다.");
      });
  };

const __editProfileImg =
  (file, __userId, currentImageUrl) => (dispatch, getState) => {
    console.log(file, __userId, currentImageUrl);

    const formData = new FormData();
    formData.append("image", file);

    apis
      .editProfileImg(formData, __userId)
      .then((response) => {
        console.log(response);
        dispatch(editProfileImg(currentImageUrl));

        // window.location.reload();
      })
      .catch((error) => {
        console.log(error);
        alert("프로필 이미지 업데이트를 실패했습니다.");
      });
  };

// reducer
export default handleActions(
  {
    [LOG_IN]: (state, action) =>
      produce(state, (draft) => {
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
    [GET_USER]: (state, action) =>
      produce(state, (draft) => {
        draft.feeds = action.payload.feeds;
        draft.follower = action.payload.follower;
        draft.following = action.payload.following;
        draft.feedCount = action.payload.feedCount;
        draft.profile_userId = action.payload.profile_userId;
        draft.profile_nickName = action.payload.profile_nickName;
        draft.profile_userProfileImg = action.payload.profile_userProfileImg;
      }),
    [EDIT_PROFILE_IMG]: (state, action) =>
      produce(state, (draft) => {
        draft.profile_userProfileImg = action.payload.currentImageUrl;
      }),
    [FOLLOW_USER]: (state, action) =>
      produce(state, (draft) => {
        draft.followCheck = action.payload.payload;
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
  getUser,
  __getUser,
  editProfileImg,
  __editProfileImg,
  follow_user,
  __follow,
};

export { actionCreators };
