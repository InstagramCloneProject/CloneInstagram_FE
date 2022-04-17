import React, { useState } from "react";
import styled from "styled-components";

import Header from "../components/Header";
import Follower from "../components/Follower";
import PostCard from "../components/PostCard";

import { history } from "../redux/configureStore";
import { Grid } from "../elements";

const Main = (props) => {
  return (
    <MainBox>
      <Header />
      <Grid borderLine="1px solid black" padding="0 23%">
        {/* post */}
        <PostBox>
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
  width: 76%;
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
