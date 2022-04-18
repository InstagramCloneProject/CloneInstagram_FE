import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001/",
  headers: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json,",
  },
});

api.interceptors.request.use(function (config) {
  const accessToken = localStorage.Authorization;
  config.headers.common["Authorization"] = `${accessToken}`;
  return config;
});

export const apis = {
  // post
  // add: (contents) => api.post("/api/articles", contents),
  // edit: (id, contents) => api.put(`api/articles/${id}`, contents),
  delete: (Id) => api.delete(`/api/posts/${Id}`),
  getDetail: (Id) => api.get(`/api/details/${Id}`),
  getFeed: () => api.get("/feed"),

  // comment
  addComment: (post_id, NewComment) =>
    api.post("/api/comment", { postId: post_id, comment: NewComment }),
  getComment: (post_id) => api.get(`/api/comments/${post_id}`),
  delComment: (commentId) => api.delete(`/api/comment/${commentId}`),
  editComment: (commentId, comment) =>
    api.put(`/api/comment/${commentId}`, { comment }),

  // user
  login: (userId, password) =>
    api.post("/user/login", { userId: userId, password: password }),
  join: (userId, nickName, password, confirmPassword) =>
    api.post("/user/join", {
      userId: userId,
      nickName: nickName,
      password: password,
      confirmPassword: confirmPassword,
    }),
  // userinfo: () => api.get(`/userinfo`),
};
