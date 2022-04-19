import React from "react";
import styled from "styled-components";
import { Button, Grid, Image, Text, Input, Modal } from "../elements/index";

import { history } from "../redux/configureStore";
import { RiHeart3Line, RiHeart3Fill } from "react-icons/ri";
import DelPop from "./DelPop";

import myProfileIcon from "../assets/icons/myprofile.png";
import moreIcon from "../assets/icons/more.png";
import dmIcon from "../assets/icons/dm.png";
import commentIcon from "../assets/icons/comment.png";
import scrapIcon from "../assets/icons/scrap.png";
import emojiIcon from "../assets/icons/emoji.png";

const PostCard = (props) => {
  const [is_like, setIsLike] = React.useState(false);
  const changeLike = () => {
    setIsLike(!is_like);
  };

  //모달 상태관리
  const [modalOpen, setModalOpen] = React.useState(false);
  const [delOpen, setDelOpen] = React.useState(false);

  //열기
  const openModal = () => {
    setModalOpen(true);
  };

  //닫기
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <Grid
      borderLine="2px solid #ebebeb"
      borderRadius="10px"
      margin="20px 0 0 0"
      bg="#fff"
      width="92%"
    >
      {/* 상단 게시자 */}
      <UserBox width="100%">
        <Grid is_flex>
          <Grid is_flex width="auto" padding="0px 0px 0px 8px">
            <Image
              border="1px solid #bcbcbc"
              shape="circle"
              size="40"
              src={myProfileIcon}
            />
            <Text margin="0px 10px" bold>
              {props.nickname}
            </Text>
          </Grid>
          <Grid width="10%" margin="0px 15px">
            <Icon src={moreIcon} alt="see more" onClick={openModal} />
            {modalOpen && (
              <Modal closeModal={closeModal} feedId={props.feedId}>
                <DelPop closeModal={closeModal} {...props} />
                {/* 피드아이디 넘겨주기위해 delPop으로 props 넘기기 되는지 확인..! */}
              </Modal>
            )}
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
          src={props.feedImg}
          width="100%"
          _onClick={() => {
            history.push(`/postDetail/${props.feedId}`);
          }}
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
              history.push(`/postDetail/${props.feedId}`);
            }}
            src={commentIcon}
            alt="comment"
          />
          <Icon src={dmIcon} alt="direct message" />
        </Grid>
        <Grid width="12%">
          <Icon size="20" src={scrapIcon} alt="scrap" />
        </Grid>
      </Grid>

      {/* 좋아요 개수 */}
      <Grid padding="0px 18px">
        <Text bold textAlign="left" margin="0">
          {props.feedLikeCount}개
        </Text>
      </Grid>

      {/* 본문 */}
      <Grid display="flex" padding="0 5px 0 18px">
        <Grid is_flex>
          <Text bold textAlign="left" margin="10px 0px">
            {props.nickname}
          </Text>
          <Ellipsis>
            <Text textAlign="left" margin="0px 10px">
              {props.content}
            </Text>
          </Ellipsis>
        </Grid>
      </Grid>
      <EButton>더보기</EButton>

      {/* 댓글모두보기 버튼 */}
      <Grid padding="0 5px 0 18px">
        <Text
          color="#8e8e8e"
          cursor="pointer"
          textAlign="left"
          margin="10px 0px"
          _onClick={() => {
            history.push(`/postDetail/${props.feedId}`);
          }}
        >
          {/* 프롭스에서 넘겨받은 데이터 */}
          "댓글 15개 모두보기"
        </Text>

        <Grid Control="left" display="flex">
          <Text bold>sparta</Text>
          <Text margin="0px 10px"> 스티치 귀여워요!🔥🔥🔥 </Text>
        </Grid>
      </Grid>

      {/* 작성시간 */}
      <Grid padding="5px 16px 16px 18px">
        <Text color="#8e8e8e" size="10px" textAlign="left">
          {props.feedCreateAt}
        </Text>
      </Grid>

      {/* 댓글 작성 */}
      <CommentBox>
        <Grid is_flex>
          <img
            src={emojiIcon}
            style={{ cursor: "pointer", margin: "7px 16px 8px 0" }}
            height={"30px"}
            alt="emoticon"
          />
          <Grid width="300px">
            <Input border="none" placeholder="댓글 달기..."></Input>
          </Grid>
          <Text bold color="#0095F6" cursor="pointer" margin="10px 0px">
            게시
          </Text>
        </Grid>
      </CommentBox>
    </Grid>
  );
};

PostCard.defaultProps = {
  feedImg:
    "https://cdn.univ20.com/wp-content/uploads/2015/07/74c65e31a2ac254a807006765be8fcf5-700x448.gif",
  content: "CSS 너무 어려워....방망이 깎는 장인...🤮",
  feedId: 1,
  nickname: "hanghae123",
  feedLikeCount: "0",
  feedCreateAt: "1일 전",
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
  onClick
`;

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
