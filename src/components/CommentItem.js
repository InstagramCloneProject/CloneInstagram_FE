import React from "react";
import { Grid, Text, Image } from "../elements/index";
import { RiHeart3Fill, RiHeart3Line } from "react-icons/ri";
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import { actionCreators as feedActions } from "../redux/modules/feed";

import myProfileIcon from "../assets/icons/myprofile.png";

//main 페이지, 디테일 페이지에서 렌더링
function CommentItem() {
  return (
    <div>
      <Grid
        column="column"
        width="100%"
        height="65%"
        padding="0px 10px 0px 0px"
      >
        <Grid is_flex width="42%">
          <Image
            border="1px solid #bcbcbc"
            shape="circle"
            size="40"
            src={myProfileIcon} // comment 렌더링할때 프로필 받아오기
          />
          <Text bold textAlign="left" margin="10px 0px">
            sparta111
          </Text>
        </Grid>
        <Text margin="0px 0px 0px 50px " textAlign="left">
          CSS 너무 어려워!!!
        </Text>
      </Grid>
    </div>
  );
}

export default CommentItem;
