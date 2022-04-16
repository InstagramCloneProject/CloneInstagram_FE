import React from "react";
import styled from "styled-components";
import { Button, Grid, Image, Text, Input } from "../elements/index";

import { history } from "../redux/configureStore";
import { RiHeart3Line, RiHeart3Fill } from "react-icons/ri";

const PostCard = (props) => {
  const [is_like, setIsLike] = React.useState(false);
  const changeLike = () => {
    setIsLike(!is_like);
  };

  return (
    <Grid
      borderLine="2px solid #ebebeb"
      borderRadius="3px"
      margin="20px 0 0 0"
      bg="#fff"
      _onClick={() => {
        history.push("/postDetail/0");
      }}
    >
      {/* 상단 게시자 */}
      <UserBox width="100%">
        <Grid is_flex>
          <Grid is_flex width="auto" padding="0px 8px">
            <Image
              border="1px solid #bcbcbc"
              shape="circle"
              size="40"
              src="myprofile.png"
            />
            <Text margin="0px 10px" bold>
              hanghae123
            </Text>
          </Grid>
          <Grid width="30px" margin="0px 20px">
            <Icon src="more.png" alt="see more" />
          </Grid>
        </Grid>

        {/* <More>
          {props.nickname === localData ? (
            <PostModal is_me={true} post_id={props._id} />
          ) : (
            <PostModal is_me={false} post_id={props._id} />
          )}
        </More> */}
      </UserBox>

      {/*  포스팅이미지  */}
      <Grid>
        <Image
          shape="rectangle"
          src="https://cdn.univ20.com/wp-content/uploads/2015/07/74c65e31a2ac254a807006765be8fcf5-700x448.gif"
          width="100%"
        />
      </Grid>

      {/* 하단 아이콘 */}
      <Grid is_flex>
        <Grid is_flex width="auto" padding="10px 16px">
          {is_like ? (
            <RiHeart3Fill
              style={{ cursor: "pointer" }}
              size="28"
              color="#ed4a57"
              onClick={changeLike}
            />
          ) : (
            <RiHeart3Line
              style={{ cursor: "pointer" }}
              size="28"
              onClick={changeLike}
            />
          )}
          <Icon
            onClick={() => {
              history.push("/postDetail");
            }}
            src="comment.png"
            alt="comment"
          />
          <Icon src="dm.png" alt="direct message" />
        </Grid>
        <Grid width="50px">
          <Icon size="20" src="scrap.png" alt="scrap" />
        </Grid>
      </Grid>

      {/* 좋아요 개수 */}
      <Grid padding="0px 18px">
        <Text bold textAlign="left" margin="0">
          좋아요 10개
        </Text>
      </Grid>

      {/* 본문 */}
      <Grid display="flex" padding="0 5px 0 18px">
        <Grid is_flex>
          <Text bold textAlign="left">
            hanghae123
          </Text>
          <Ellipsis>
            <Text textAlign="left" margin="0px 10px">
              CSS 너무 어려워....방망이 깎는 장인...
            </Text>
          </Ellipsis>
        </Grid>
      </Grid>
      <EButton>더보기</EButton>

      {/* 댓글모두보기 버튼 */}
      <Grid padding="0 5px 0 18px">
        <Text color="#8e8e8e" cursor="pointer" textAlign="left">
          "댓글 15개 모두보기"
        </Text>
      </Grid>

      {/* 작성시간 */}
      <Grid padding="5px 16px 16px 16px">
        <Text color="#8e8e8e" size="10px" textAlign="left">
          15시간 전
        </Text>
      </Grid>

      {/* 댓글 작성 */}
      <CommentBox>
        <Grid is_flex>
          <img
            src="emoji.png"
            style={{ cursor: "pointer", padding: "0px 16px 8px 0" }}
            height={"30px"}
            alt="emoticon"
          />
          <Grid width="300px">
            <Input border="none" placeholder="댓글 달기..."></Input>
          </Grid>
          <Text bold color="#0095F6" cursor="pointer">
            게시
          </Text>
        </Grid>
      </CommentBox>
    </Grid>
  );
};

const UserBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 0;
`;
const Userinfo = styled.div`
  padding-left: 16px;
  display: flex;
  align-items: center;
`;
const More = styled.div`
  padding-right: 16px;
`;
const CommentBox = styled.div`
  padding: 0 16px;
  display: flex;
  flex: 1, 1, 0;
  border-top: 1px solid #efefef;
`;
const Icon = styled.img`
  width: 24px;
  height: 24px;
  margin-left: 20px;
  cursor: pointer;
`;

PostCard.defaultProps = {};
const Ellipsis = styled.div`
  /* position: relative; */
  text-align: left;
  max-height: 6rem;
  line-height: 2rem;
  /* width: 300px; */
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  /* overflow: hidden; */
  text-overflow: ellipsis;
  font-size: 14px;
  display: block;
  max-height: none;
  width: 93%;
  line-height: 2rem;
  -webkit-line-clamp: unset;
  }
`;
const EButton = styled.button`
  max-height: 2rem;
  padding-left: 20px;
  background: none;
  border: none;
  color: #8f8f8f;
  font-size: 14px;
  cursor: pointer;
  &.hide {
    display: none;
  }
`;
export default PostCard;
