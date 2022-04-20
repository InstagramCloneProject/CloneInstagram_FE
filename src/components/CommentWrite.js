import React from "react";
import { Grid, Text, Input } from "../elements/index";
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import { actionCreators as commentActions } from "../redux/modules/comment";

import emojiIcon from "../assets/icons/emoji.png";

//프롭스로 아이디 받아와야함
function CommentWrite(props) {
  const { postId } = props;
  const dispatch = useDispatch();

  const [comment, setComment] = React.useState();

  const onChange = (e) => {
    setComment(e.target.value);
  };

  const write = () => {
    if (comment === "") {
      window.alert("댓글을 입력해주세요!");
      return;
    }
    dispatch(commentActions.addCommentDB(comment, props.feedId));
    setComment(""); //작성 누르면 인풋창 value 날리기
  };

  return (
    <div>
      <Grid
        justifyContent="center"
        display="flex"
        borderTop="1px solid #efefef"
      >
        <Grid display="flex" width="80%" height="10%" padding="5px 0px 0px 8px">
          <img
            src={emojiIcon}
            style={{
              cursor: "pointer",
              padding: "5px 0px",
            }}
            height={"40px"}
            alt="emoticon"
          />
          <Input
            border="none"
            placeholder="댓글 달기..."
            _onChange={onChange}
            value={comment}
          ></Input>
        </Grid>
        <Text
          bold
          color="#0095F6"
          cursor="pointer"
          margin=" 15px auto"
          _onClick={write}
        >
          게시
        </Text>
      </Grid>
    </div>
  );
}

export default CommentWrite;
