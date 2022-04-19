import { createAction, handleActions } from "redux-actions";
import produce from "immer";

const UPLOADING = "UPLOADING";
const UPLOAD_IMAGE = "UPLOAD_IMAGE";
const SET_PREVIEW = "SET_PREVIEW";

const uploading = createAction(UPLOADING, (uploading) => ({ uploading }));
const uploadImage = createAction(UPLOAD_IMAGE, (preview, file) => ({
  preview,
  file,
}));
const initialState = {
  image_url: "",
  uploading: false,
  preview: null,
};

export default handleActions(
  {
    [UPLOAD_IMAGE]: (state, action) =>
      produce(state, (draft) => {
        console.log("이미지 정보 리덕스에 넣음");
        draft.preview = action.payload.preview;
        draft.file = action.payload.file;
        draft.uploading = false;
      }),
    // [UPLOADING]: (state, action) =>
    //   produce(state, (draft) => {
    //     draft.uploading = action.payload.uploading;
    //   }),
  },
  initialState
);

const actionCreators = {
  uploadImage,
};

export { actionCreators };
