import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../shared/apis";
import { RES } from "../../shared/response";

// action
const SET_FEED = "SET_FEED";
const ADD_FEED = "UPLOAD_FEED";
const EDIT_FEED = "EDIT_FEED";
const DEL_FEED = " DEL_FEED";
const GET_DETAIL = "GET_DETAIL";

// action creator
const setFeed = createAction(SET_FEED, (feed_list) => feed_list); //중괄호 여부 체크 필요!
const getDetail = createAction(GET_DETAIL, (FeedInfo) => FeedInfo);
// const addFeed = createAction(ADD_FEED, (feed) => ({ feed }));
const delFeed = createAction(DEL_FEED, (feedId) => ({ feedId }));
const editFeed = createAction(EDIT_FEED, (feedId, content) => ({
  feedId,
  content,
}));

// initialState
const initialState = {
  feedInfo: null,
  list: [],
  follow_list: [],
};

const initialPost = {
  preview: "",
  id: 1,
  nickName: "coooooodinnngg",
  createdAt: "2021-02-27 10:00:00",
  feedImg:
    "https://velog.velcdn.com/images/gagyeong/post/d1481a6f-0583-4610-b253-4a9c6efc03cf/image.png",
};

// middleware
const getFeedDB = () => {
  return async function (dispatch, getState) {
    try {
      const { data } = await apis.get();
      console.log(data);
      const feed_list = data.feedList;
      dispatch(setFeed(feed_list));
    } catch {
      alert("데이터를 불러오지 못했습니다.");
    }
  };
};

const getDetailDB = (feedId) => {
  return async function (dispatch, getState) {
    try {
      const { data } = await apis.getDetail(feedId);

      dispatch(getDetail(data.Feed)); //리덕스에 넘길 상세정보 재정비 할 필요 있나 확인필요
    } catch (err) {
      window.alert("상세정보 불러오기 실패");
      console.log(err);
    }
  };
};

const addFeedDB = (file, content) => {
  return async function (dispatch, getState, { history }) {
    try {
      // console.log("image:", file);
      // console.log("content:", content);
      console.log("등록정보 모듈에 넘어갔어");

      const formData = new FormData();
      formData.append("image", file);
      formData.append("content", content);

      const { data } = await apis.add(formData);
      console.log("등록후 서버에서 받는 정보", data);

      // const img_url = getState((state) => state.image.preview);
      // const userId = localStorage.getItem("userId");
      // const profileImg = localStorage.getItem("profileImgUrl");
      // // 유저네임/유저이미지/컨텐츠이미지/컨텐츠/작성시간
      // const feed = {
      //   comments: [],
      //   feedLikes: [],
      //   user: { userId: userId },
      //   profileImg: profileImg,
      //   id: data.id,
      //   feedImg: img_url,
      //   content: content,
      //   createdAt: data.createdAt,
      // };
      dispatch(getFeedDB());
      history.replace("/main");
    } catch (err) {
      console.log(err, "업로드에 실패하였습니다.");
      window.alert("업로드에 실패하였습니다.");
    }
  };
};

//수정페이지에서 url 수정여부를 검사해서 보내줘야 할 듯.
const editFeedDB = (feedId, content, closeModal) => {
  return async function (dispatch, getState, { history }) {
    try {
      console.log("수정디스패치", feedId, content);

      const formData = new FormData();
      formData.append("content", content);
      const { data } = await apis.edit(feedId, formData);

      console.log(data);
      window.alert("피드 수정 완료!");

      dispatch(getFeedDB());
      history.replace("/main");
      // dispatch(editFeed(feedId, content));
      closeModal();
    } catch (err) {
      console.log(err);
      window.alert("수정 오류가 발생하였습니다. 다시 시도해주세요.");
    }
  };
};

const delFeedDB = (feedId) => {
  return async function (dispatch, getState, { history }) {
    console.log("DB 삭제한다", feedId); //

    try {
      await apis.delete(feedId);

      const feed_list = getState().feed.list;
      console.log(feed_list);
      const feed_index = feed_list.findIndex((f) => {
        return parseInt(f.id) === parseInt(feedId);
      });
      console.log(feed_index);

      dispatch(delFeed(feedId));
      history.goBack();
    } catch (err) {
      console.log(err);
      window.alert("삭제실패! 다시 시도해주세요.");
    }
  };
};

// reducer
export default handleActions(
  {
    [SET_FEED]: (state, action) =>
      produce(state, (draft) => {
        // console.log("리듀서 피드 불러온다", action.payload);
        draft.list = action.payload;
      }),
    [GET_DETAIL]: (state, action) =>
      produce(state, (draft) => {
        draft.feedInfo = action.payload[0];
      }),
    [ADD_FEED]: (state, action) =>
      produce(state, (draft) => {
        console.log("리듀서 추가로 넘어왔어.");
        draft.list.unshift(action.payload);
      }),
    [DEL_FEED]: (state, action) =>
      produce(state, (draft) => {
        console.log("리듀서 삭제로 넘어왔어.", action.payload);
        draft.list = state.list.filter((f) => f.id !== action.payload);
      }),
    [EDIT_FEED]: (state, action) =>
      produce(state, (draft) => {
        console.log("리듀서 수정으로 넘어왔어.", action.payload);
        let idx = draft.list.findIndex((f) => {
          return parseInt(f.feedId) === parseInt(action.payload.feedId);
        });
        draft.list[idx] = {
          ...draft.list[idx],
          content: action.payload.content,
        };

        console.log(draft.list[idx]);
      }),
  },
  initialState
);

const actionCreators = {
  addFeedDB,
  getFeedDB,
  getDetailDB,
  delFeedDB,
  editFeedDB,
};

export { actionCreators };
