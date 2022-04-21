// eslint-disable-next-line
import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

// import components
import Header from "../components/Header";

// import elements
import { Button, Grid, Input, Image, Text } from "../elements";
import { history } from "../redux/configureStore";

// import MUI
import { Avatar } from "@mui/material";

// import react-icons
import { BsGrid3X3 } from "react-icons/bs";
import { useEffect } from "react";
import { actionCreators } from "../redux/modules/feed";
import { actionCreators as userActions } from "../redux/modules/user";

function Profile(props) {
  const dispatch = useDispatch();

  // state data
  const _user = useSelector((state) => state.user);
  const fileInput = React.useRef();

  // variables
  const __userId = parseInt(useParams().userId);
  const __userId_storage = parseInt(localStorage.getItem("user_Id"));

  const __feeds = _user.feeds;
  const __feedCount = _user.feedCount;
  const __follower = _user.follower;
  const __following = _user.following;
  const __profile_userId = _user.profile_userId;
  const __profile_nickName = _user.profile_nickName;
  const __profile_userProfileImg = _user.profile_userProfileImg;
  const __followBool = _user.followBool;

  console.log(__feeds, __feedCount, __follower, __following, __followBool);

  useEffect(() => {
    dispatch(userActions.__getUser(__userId));
  }, [
    __followBool,
    __userId,
    __profile_userProfileImg,
    __feedCount,
    __follower,
    __following,
  ]);

  const editProfileImg = () => {
    const file = fileInput.current.files[0];
    const currentImageUrl = URL.createObjectURL(file);

    dispatch(userActions.__editProfileImg(file, __userId, currentImageUrl));
  };

  const handleFollow = () => {
    dispatch(userActions.__follow(__userId_storage, __profile_userId));
  };

  const handleUnFollow = () => {
    dispatch(userActions.__unfollow(__userId_storage, __profile_userId));
  };

  return (
    <React.Fragment>
      <Header />
      <Grid width="100%" padding="80px 0 0 0">
        <Grid width="940px" margin="auto" _style={{ flexDirection: "column" }}>
          <Grid width="70%" is_flex margin="auto">
            <Avatar
              alt="Remy Sharp"
              src={__profile_userProfileImg}
              sx={{ marginRight: "50px", width: 150, height: 150 }}
            />
            <Grid padding="0 0 0 40px">
              <Grid
                width="100%"
                is_flex
                _style={{ justifyContent: "flex-start" }}
              >
                <Text color="#000" size="20px">
                  {__profile_userId}
                </Text>
                {__userId === __userId_storage ? (
                  <div>
                    <button
                      style={{
                        width: "100px",
                        backgroundColor: "#fff",
                        border: "1px solid #bbb",
                        borderRadius: "4px",
                        fontWeight: "bold",
                        height: "30px",
                        marginLeft: "20px",
                      }}
                      onClick={() => {
                        fileInput.current.click();
                      }}
                    >
                      프로필 변경
                    </button>
                    <input
                      ref={fileInput}
                      onChange={editProfileImg}
                      type="file"
                      style={{ display: "none" }}
                    ></input>
                  </div>
                ) : __followBool === false ? (
                  <button
                    style={{
                      width: "100px",
                      backgroundColor: "#0095f6",
                      color: "#fff",
                      border: "1px solid #bbb",
                      borderRadius: "4px",
                      fontWeight: "bold",
                      height: "30px",
                      marginLeft: "20px",
                    }}
                    onClick={handleFollow}
                  >
                    팔로우
                  </button>
                ) : (
                  <button
                    style={{
                      width: "100px",
                      backgroundColor: "#fff",
                      border: "1px solid #bbb",
                      borderRadius: "4px",
                      fontWeight: "bold",
                      height: "30px",
                      marginLeft: "20px",
                    }}
                    onClick={handleUnFollow}
                  >
                    언팔로우
                  </button>
                )}
              </Grid>
              <Grid
                width="100%"
                is_flex
                _style={{ justifyContent: "flex-start" }}
              >
                <Text color="#000" margin="20px 40px 20px 0">
                  게시물 {__feedCount}
                </Text>
                <Text color="#000" margin="20px 40px 20px 0">
                  팔로워 {__follower}
                </Text>
                <Text color="#000" margin="20px 40px 20px 0">
                  팔로우 {__following}
                </Text>
              </Grid>
              <Grid
                width="100%"
                is_flex
                _style={{ justifyContent: "flex-start" }}
              >
                <Text color="#000" bold>
                  {__profile_nickName}
                </Text>
              </Grid>
            </Grid>
          </Grid>
          <Grid _style={{ borderTop: "1px solid #bbb", marginTop: "50px" }}>
            <Text color="#000" margin="20px 0">
              <BsGrid3X3 size="10px" style={{ marginRight: "5px" }} />
              게시물
            </Text>
            <Grid width="100%">
              <div className="container">
                <div className="row">
                  {__feeds.length !== 0
                    ? __feeds.map((cur, idx) => {
                        return (
                          <div
                            className="col-md-4"
                            key={idx}
                            onClick={() => {}}
                          >
                            <Image
                              shape="rectangle"
                              src={cur.feedImage}
                              alt=""
                              _onClick={() => {
                                history.push(
                                  `/postDetail/${__feeds[idx].feedId}`
                                );
                              }}
                            />
                          </div>
                        );
                      })
                    : null}
                </div>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default Profile;
