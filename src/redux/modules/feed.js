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
const setFeed = createAction(SET_FEED, (feed_list, unfollow_list) => ({
  feed_list,
  unfollow_list,
}));
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
  feedInfo: [],
  list: [],
  unfollow_list: [],
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
      const feed_list = data.feedList;
      const unfollow_list = data.unfollowList;
      dispatch(setFeed(feed_list, unfollow_list));
    } catch {
      alert("데이터를 불러오지 못했습니다.");
    }
  };
};

const getDetailDB = (feedId) => {
  return async function (dispatch, getState, { history }) {
    try {
      const { data } = await apis.getDetail(feedId);
      dispatch(getDetail(data.Feed));
    } catch (err) {
      window.alert("상세정보 불러오기 실패");
      console.log(err);
    }
  };
};

const addFeedDB = (file, content) => {
  return async function (dispatch, getState, { history }) {
    try {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("content", content);

      const { data } = await apis.add(formData);

      dispatch(getFeedDB());
      history.replace("/main");
    } catch (err) {
      console.log(err, "업로드에 실패하였습니다.");
      window.alert("업로드에 실패하였습니다.");
    }
  };
};

const editFeedDB = (feedId, content, closeModal) => {
  return async function (dispatch, getState, { history }) {
    try {
      const formData = new FormData();
      formData.append("content", content);
      const { data } = await apis.edit(feedId, formData);

      window.alert("피드 수정 완료!");

      dispatch(getFeedDB());
      closeModal();
    } catch (err) {
      console.log(err);
      window.alert("수정 오류가 발생하였습니다. 다시 시도해주세요.");
    }
  };
};

const delFeedDB = (feedId) => {
  return async function (dispatch, getState, { history }) {
    try {
      await apis.delete(feedId);

      const feed_list = getState().feed.list;
      const feed_index = feed_list.findIndex((f) => {
        return parseInt(f.id) === parseInt(feedId);
      });

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
    try {
      const { data } = await apis.addComment(content, feed_Id);

      const user_Id = localStorage.getItem("userId");
      const comment = {
        id: data.id,
        user_Id: user_Id,
        content: content,
        createdAt: data.createdAt,
      };
      dispatch(getFeedDB());
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
    try {
      const { data } = await apis.delComment(commentId);

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
    try {
      const userId = localStorage.getItem("userId");
      const { data } = await apis.like(feed_Id, userId);
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
    try {
      const userId = localStorage.getItem("userId");
      const { data } = await apis.unLike(feed_Id);
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
    try {
      const userId = localStorage.getItem("userId");
      const { data } = await apis.commentLike(commentId, userId);

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
    try {
      const userId = localStorage.getItem("userId");
      const { data } = await apis.commentUnlike(commentId);

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
        draft.list = action.payload.feed_list;
        draft.unfollow_list = action.payload.unfollow_list;
      }),
    [GET_DETAIL]: (state, action) =>
      produce(state, (draft) => {
        draft.feedInfo = action.payload[0];
      }),
    [DEL_FEED]: (state, action) =>
      produce(state, (draft) => {
        draft.list = state.list.filter((f) => f.id !== action.payload);
      }),
    [EDIT_FEED]: (state, action) =>
      produce(state, (draft) => {
        let idx = draft.list.findIndex((f) => {
          return parseInt(f.feedId) === parseInt(action.payload.feedId);
        });
        draft.list[idx] = {
          ...draft.list[idx],
          content: action.payload.content,
        };
      }),

    [ADD_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        let idx = draft.list.findIndex((f) => {
          return parseInt(f.id) === parseInt(action.payload.feed_Id);
        });

        draft.list[idx].comments.push(action.payload.comment);
      }),
    [DELETE_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        let idx = draft.list.findIndex((f) => {
          return parseInt(f.id) === parseInt(action.payload.feed_Id);
        });

        const new_comment_list = draft.list[idx].comments.filter((c) => {
          return parseInt(action.payload.commentId) !== c.id;
        });
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
