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
const getDetail = createAction(GET_DETAIL, (detailFeed) => ({ detailFeed }));
const addFeed = createAction(ADD_FEED, (feed) => ({ feed }));
const delFeed = createAction(DEL_FEED, (feedId) => ({ feedId }));
const editFeed = createAction(EDIT_FEED, (payload) => ({ payload }));

// initialState
const initialState = {
  list: [],
  follow_list: [],
};

const initialPost = {
  preview: "",
  feedId: 1,
  nickname: "coooooodinnngg",
  createdAt: "2021-02-27 10:00:00",
  imageUrl:
    "https://velog.velcdn.com/images/gagyeong/post/d1481a6f-0583-4610-b253-4a9c6efc03cf/image.png",
};

// middleware
const getFeedDB = () => {
  return async function (dispatch, getState) {
    try {
      // const { data } = await apis.get();
      const { data } = RES;
      console.log("RES 데이터 보기", data); //undefined
      dispatch(setFeed(data));
    } catch {
      alert("데이터를 불러오지 못했습니다.");
    }
  };
};

const getDetailDB = (feedId) => {
  return async function (dispatch, getState) {
    try {
      console.log("상세정보받으러 간다!");
      const { data } = await apis.getDetail(feedId);
      console.log("상세정보 확인", data);

      dispatch(getDetail(data)); //리덕스에 넘길 상세정보 재정비 할 필요 있나 확인필요
    } catch (err) {
      window.alert("상세정보 불러오기 실패");
      console.log(err);
    }
  };
};

const addFeedDB = (file, content) => {
  return async function (dispatch, getState, { history }) {
    try {
      console.log("업로드 통신 시작", file, content);

      const formData = new FormData();
      formData.append("file", file);
      formData.append(
        "content",
        new Blob([JSON.stringify(content)], { type: "application/json" })
      );

      await apis.add(formData);

      const img_url = getState((state) => state.image.preview);
      // 유저네임/유저이미지/컨텐츠이미지/컨텐츠/작성시간
      const feed = {
        userName: "",
        profileimg: "",
        feedId: "",
        feedImg: img_url,
        content: content,
        feedLikeCount: 0,
        feedCreateAt: "",
      };
      dispatch(addFeed(feed));
    } catch (err) {
      console.log(err, "업로드에 실패하였습니다.");
      window.alert("업로드에 실패하였습니다.");
    }
  };
};

//수정페이지에서 url 수정여부를 검사해서 보내줘야 할 듯.
const editFeedDB = (data) => {
  return async function (dispatch, getState, { history }) {
    try {
      console.log("수정통신", data);

      const feedInfo = getState().feed.list;
      console.log("피드정보", feedInfo);

      const feedImg = feedInfo[0].feedImg;

      if (data.img_url === feedImg) {
        const formData = new FormData();
        formData.append(
          "information",
          new Blob([JSON.stringify(data.contents)], {
            type: "application/json",
          })
        );
        await apis.patch(data.feedId, formData).then((res) => {
          window.alert("피드 수정 완료!");
          dispatch(editFeed(data.img_url, data.feedId, data.contents));
        });
        // .catch((err) => {
        //   console.log(err);
        //   window.alert("수정 오류가 발생하였습니다. 다시 시도해주세요.");
        // });
      } else if (data.img_url !== feedImg) {
        const formData = new FormData();
        formData.append("file", data.file);
        formData.append(
          "information",
          new Blob([JSON.stringify(data.contents)], {
            type: "application/json",
          })
        );
        await apis.patch(data.feedId, formData).then((res) => {
          window.alert("피드 수정 완료!");
          dispatch(editFeed(data.img_url, data.feedId, data.contents));
        });
        // .catch((err) => {
        //   console.log(err);
        //   window.alert("수정 오류가 발생하였습니다. 다시 시도해주세요.");
        // });
      }
    } catch (err) {
      console.log(err);
      window.alert("수정 오류가 발생하였습니다. 다시 시도해주세요.");
    }
  };
};

const delFeedDB = (feedId) => {
  return async function (dispatch, getState, { history }) {
    try {
      const { data } = await apis.delete(feedId);
      const _feed = getState().feed.list;
      console.log(_feed);
      const feed_index = _feed.findIndex((f) => {
        return parseInt(f.feedId) === parseInt(feedId);
      });
      dispatch(delFeed(feedId));
      history.goBack();
    } catch (err) {
      console.log(err);
      window.alert("삭제실패! 다시 시도해주세요.");
      history.goBack();
    }
  };
};

// reducer
export default handleActions(
  {
    [SET_FEED]: (state, action) =>
      produce(state, (draft) => {
        console.log("리듀서 피드 불러온다");
        draft.list = action.payload.payload;
      }),
    [ADD_FEED]: (state, action) =>
      produce(state, (draft) => {
        console.log("리듀서 피드 애드한다");
        draft.list.unshift(action.payload.feed);
      }),
    [DEL_FEED]: (state, action) =>
      produce(state, (draft) => {
        console.log("리듀서 삭제한다.");
        draft.list = state.list.filter(
          (f) => f.feedId !== action.payload.feedId
        );
      }),
    [EDIT_FEED]: (state, action) =>
      produce(state, (draft) => {
        console.log("리듀서 수정한다!");
      }),
  },
  initialState
);

const actionCreators = {
  addFeedDB,
  getFeedDB,
  getDetailDB,
};

export { actionCreators };
