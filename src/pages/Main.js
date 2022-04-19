import React, { useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { actionCreators as feedActions } from "../redux/modules/feed";
import { history } from "../redux/configureStore";

import styled from "styled-components";

import Header from "../components/Header";
import Follower from "../components/Follower";
import PostCard from "../components/PostCard";
import { Grid } from "../elements";

const Main = (props) => {
  const dispatch = useDispatch();
  // React.useEffect(() => {
  //   dispatch(feedActions.getFeedDB());
  // }, []);

  const feed_list = useSelector((state) => state.feed.list); //feed 관련 정보만 담음
  console.log(feed_list); // []

  return (
    <MainBox>
      <Header />
      <Grid padding="2% 23%">
        {/* post */}
        <PostBox>
          {/* {feed_list.map((f, idx) => {
            return <PostCard key={idx} {...f} feedId={f.feedId} />; // 댓글개수도 넘겨줘야함
          })} */}
          <PostCard />
        </PostBox>
        <AsideBox>
          <Follower />
        </AsideBox>
      </Grid>
    </MainBox>
  );
};
const MainBox = styled.div`
  height: 100%;
  background-color: #fafafa;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Section = styled.div`
  width: 7%;
  height: 100%;
  display: flex;
`;
const PostBox = styled.div`
  width: 100vw;
  max-width: 470px;
  margin-top: 54px;
`;
const AsideBox = styled.div`
  width: 400px;
  position: fixed;
  left: calc(100vw - 46vw);
  top: 75px;
`;

export default Main;
