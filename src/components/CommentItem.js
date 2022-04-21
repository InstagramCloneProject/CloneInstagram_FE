import React from "react";
import { Grid, Text, Image } from "../elements/index";
import { RiHeart3Fill, RiHeart3Line, RiDeleteBin5Line } from "react-icons/ri";

import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import { actionCreators as commentActions } from "../redux/modules/feed";

import moreIcon from "../assets/icons/more.png";

function CommentItem(props) {
  console.log("댓글에서 피드아이디 프롭스 있나?", props.feed_Id);
  const dispatch = useDispatch();
  // 좋아요 요청 함수
  // 좋아요 취소 함수
  // const ComLikeCount = props.comments[props.idx].commentLikes.length; // 확인필요
  const delcomment = () => {
    dispatch(commentActions.delCommentDB(props.feed_Id, props.id));
  };

  return (
    <div>
      <Grid
        column="column"
        width="100%"
        height="65%"
        padding="0px 10px 0px 0px"
      >
        <Grid is_flex>
          <Grid display="flex" Control="left">
            <Image
              border="1px solid #bcbcbc"
              shape="circle"
              size="25"
              src={props.user.userInfos[0].profileImg} // comment 렌더링할때 프로필 받아오기
            />
            <Text bold textAlign="left" margin="5px 10px">
              {props.user.userId}
            </Text>
          </Grid>
          <Grid width="5%" padding="0px 0px">
            {props.commentLikes.length > 0 ? (
              <RiHeart3Fill
                style={{ cursor: "pointer" }}
                size="15"
                color="#ed4a57"
                // onClick={좋아요 취소}
              />
            ) : (
              <RiHeart3Line
                style={{ cursor: "pointer" }}
                size="15"
                // onClick={좋아요}
              />
            )}
          </Grid>
        </Grid>
        <Text margin="0px 0px 0px 45px " textAlign="left">
          {props.content}
        </Text>
        <Grid padding="5px 16px 0px 10px" display="flex" Control="left">
          <Text color="#8e8e8e" size="10px" textAlign="left" margin="0px 15px">
            {props.createdAt}
          </Text>
          <RiDeleteBin5Line
            size="13"
            onClick={delcomment}
            style={{ cursor: "pointer" }}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default CommentItem;
