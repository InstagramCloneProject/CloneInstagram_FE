import React from "react";
import { Grid, Text, Image } from "../elements/index";
import { RiHeart3Fill, RiHeart3Line, RiDeleteBin5Line } from "react-icons/ri";

import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import { actionCreators as commentActions } from "../redux/modules/feed";

import moreIcon from "../assets/icons/more.png";
import TimeCounting from "time-counting";

function CommentItem(props) {
  const dispatch = useDispatch();
  const delcomment = () => {
    dispatch(commentActions.delCommentDB(props.feed_Id, props.id));
  };

  //댓글 좋아요
  const userId = localStorage.getItem("userId");
  const [comment_like, setCommentLike] = React.useState(false);

  const commentLike = () => {
    dispatch(
      commentActions.commentLikeDB(props.feed_Id, props.id, setCommentLike)
    );
  };

  const commentUnlike = () => {
    dispatch(
      commentActions.commentUnlikeDB(props.feed_Id, props.id, setCommentLike)
    );
  };

  //작성시간
  const option = {
    lang: "ko",
  };
  const createdAt = TimeCounting(props.createdAt, option);

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
              src={props.user.userInfos[0].profileImg}
            />
            <Text bold textAlign="left" margin="5px 10px">
              {props.user.userId}
            </Text>
          </Grid>
          <Grid width="5%" padding="0px 0px">
            {props.commentLikes[0]?.likeId === userId || comment_like ? (
              <RiHeart3Fill
                style={{ cursor: "pointer" }}
                size="15"
                color="#ed4a57"
                onClick={commentUnlike}
              />
            ) : (
              <RiHeart3Line
                style={{ cursor: "pointer" }}
                size="15"
                onClick={commentLike}
              />
            )}
          </Grid>
        </Grid>
        <Text margin="0px 0px 0px 45px " textAlign="left">
          {props.content}
        </Text>
        <Grid padding="5px 16px 0px 10px" display="flex" Control="left">
          <Text color="#8e8e8e" size="10px" textAlign="left" margin="0px 15px">
            {createdAt}
          </Text>
          {props.user.userId === userId ? (
            <RiDeleteBin5Line
              size="13"
              onClick={delcomment}
              style={{ cursor: "pointer" }}
            />
          ) : (
            ""
          )}
        </Grid>
      </Grid>
    </div>
  );
}

export default CommentItem;
