// eslint-disable-next-line
import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

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
  const _feed = useSelector((state) => state.feed);

  const feed_list = _feed.list;
  console.log(feed_list);

  useEffect(() => {
    dispatch(actionCreators.getFeedDB());
  }, []);

  return (
    <Grid width="100%" padding="80px 0 0 0">
      <Grid width="940px" margin="auto" _style={{ flexDirection: "column" }}>
        <Grid width="100%" is_flex>
          <Avatar
            alt="Remy Sharp"
            // src={pageuser ? pageUser.userProfileUrl : ""}
            src="https://cdn.pixabay.com/photo/2017/08/06/12/06/people-2591874_960_720.jpg"
            sx={{ marginRight: "50px", width: 150, height: 150 }}
          />
          <Grid padding="0 0 0 40px">
            <Grid
              width="100%"
              is_flex
              _style={{ justifyContent: "flex-start" }}
            >
              <Text color="#000" size="20px">
                {/* {pageUser ? pageUser.loginId : ""} */}
                유저아이디
              </Text>
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
              >
                프로필 편집
              </button>
              {/* <input ref={{}} onChange={{}} type="file"></input> */}
            </Grid>
            <Grid
              width="100%"
              is_flex
              _style={{ justifyContent: "flex-start" }}
            >
              <Text color="#000" margin="20px 40px 20px 0">
                게시물
              </Text>
              <Text color="#000" margin="20px 40px 20px 0">
                팔로워
              </Text>
              <Text color="#000" margin="20px 40px 20px 0">
                팔로우
              </Text>
            </Grid>
            <Grid
              width="100%"
              is_flex
              _style={{ justifyContent: "flex-start" }}
            >
              <Text color="#000">유저닉네임</Text>
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
                {feed_list.map((cur, idx) => {
                  return (
                    <div className="col-md-4" key={idx} onClick={() => {}}>
                      <Image shape="rectangle" src={cur.feedImg} alt="" />
                    </div>
                  );
                })}
              </div>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Profile;
