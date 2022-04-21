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

const ADD_COMMENT = "comment/ADD";
const DELETE_COMMENT = "comment/DELETE";

// action creator
const setFeed = createAction(SET_FEED, (feed_list) => feed_list); //중괄호 여부 체크 필요!
const getDetail = createAction(GET_DETAIL, (FeedInfo) => FeedInfo);
const delFeed = createAction(DEL_FEED, (feedId) => ({ feedId }));
const editFeed = createAction(EDIT_FEED, (feedId, content) => ({
  feedId,
  content,
}));

//댓글
const addComment = createAction(ADD_COMMENT, (feed_Id, comment) => ({
  feed_Id,
  comment,
}));
const delComment = createAction(DELETE_COMMENT, (feed_Id, commentId) => ({
  feed_Id,
  commentId,
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
    console.log("상세정보 통신 시작");
    try {
      const { data } = await apis.getDetail(feedId);
      console.log("상세정보 DB", data);
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
      console.log("등록정보 모듈에 넘어갔어");

      const formData = new FormData();
      formData.append("image", file);
      formData.append("content", content);

      const { data } = await apis.add(formData);
      console.log("등록후 서버에서 받는 정보", data);

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
      window.location.reload();
    } catch (err) {
      console.log(err);
      window.alert("삭제실패! 다시 시도해주세요.");
    }
  };
};

//댓글

const addCommentDB = (content, feed_Id) => {
  return async function (dispatch, getState, { history }) {
    console.log("댓글추가한다!", content, feed_Id);
    try {
      const { data } = await apis.addComment(content, feed_Id);
      console.log(data);

      const user_Id = localStorage.getItem("userId");
      const comment = {
        id: data.id,
        user_Id: user_Id,
        content: content,
        createdAt: data.createdAt,
      };
      dispatch(getFeedDB);
      dispatch(getDetailDB(feed_Id));
      dispatch(addComment(feed_Id, comment));
    } catch (err) {
      console.log(err);
      window.alert("댓글 추가 실패, 다시 시도해 주세요.");
    }
  };
};

const delCommentDB = (feed_Id, commentId) => {
  return async function (dispatch, getState, { history }) {
    console.log("댓글삭제 통신 시도", commentId);
    try {
      const { data } = await apis.delComment(commentId);
      console.log(data);

      dispatch(getDetailDB(feed_Id));
      dispatch(delComment(feed_Id, commentId));
    } catch (err) {
      console.log(err);
      window.alert("댓글 삭제 실패, 다시 시도해 주세요.");
    }
  };
};

//피드 좋아요

const feedLikeDB = (feed_Id, setIsLike) => {
  return async function (dispatch, getState, { history }) {
    console.log("좋아요 통신 시도", feed_Id);
    try {
      const userId = localStorage.getItem("userId");
      const { data } = await apis.like(feed_Id, userId);
      console.log("좋아요 db 응답", data);
      dispatch(getFeedDB());
      setIsLike(true);
      dispatch(getDetailDB(feed_Id));
    } catch (err) {
      console.log(err);
      window.alert("좋아요 실패");
    }
  };
};

const feedUnlikeDB = (feed_Id, setIsLike) => {
  return async function (dispatch, getState, { history }) {
    console.log("좋아요취소 통신 시도", feed_Id);
    try {
      const userId = localStorage.getItem("userId");
      const { data } = await apis.unLike(feed_Id);
      console.log("좋아요취소 db 응답", data);
      setIsLike(false);
      dispatch(getFeedDB());
      dispatch(getDetailDB(feed_Id));
    } catch (err) {
      console.log(err);
      window.alert("좋아요 취소 실패");
    }
  };
};

//댓글 좋아요

const commentLikeDB = (feed_Id, commentId, setCommentLike) => {
  return async function (dispatch, getState, { history }) {
    console.log("댓좋 통신 시도", commentId);
    try {
      const userId = localStorage.getItem("userId");
      const { data } = await apis.commentLike(commentId, userId);
      console.log("댓좋 DB", data);

      dispatch(getFeedDB());
      setCommentLike(true);
      dispatch(getDetailDB(feed_Id));
    } catch (err) {
      console.log(err);
      window.alert("댓글 좋아요 실패!");
    }
  };
};

const commentUnlikeDB = (feed_Id, commentId, setCommentLike) => {
  return async function (dispatch, getState, { history }) {
    console.log("댓좋취 통신 시도", feed_Id, commentId);
    try {
      const userId = localStorage.getItem("userId");
      const { data } = await apis.commentUnlike(commentId);
      console.log("댓좋취 DB", data);

      dispatch(getFeedDB());
      setCommentLike(false);
      dispatch(getDetailDB(feed_Id));
    } catch (err) {
      console.log(err);
      window.alert("댓글 좋아요 취소 실패!");
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

    [ADD_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        console.log("리듀서 페이로드보자", action.payload);
        let idx = draft.list.findIndex((f) => {
          return parseInt(f.id) === parseInt(action.payload.feed_Id);
        });
        console.log("스테이트 인덱스 확인", state.list[idx]);
        console.log(idx);

        draft.list[idx].comments.push(action.payload.comment);
      }),
    [DELETE_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        console.log("리듀서 삭제 페이로드", action.payload);

        let idx = draft.list.findIndex((f) => {
          return parseInt(f.id) === parseInt(action.payload.feed_Id);
        });
        console.log("인덱스확인", idx);

        const new_comment_list = draft.list[idx].comments.filter((c) => {
          return parseInt(action.payload.commentId) !== c.id;
        });
        console.log(new_comment_list);
        draft.list[idx].comments = new_comment_list;
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
  addComment,
  delComment,
  addCommentDB,
  delCommentDB,
  feedLikeDB,
  feedUnlikeDB,
  commentLikeDB,
  commentUnlikeDB,
};

export { actionCreators };
