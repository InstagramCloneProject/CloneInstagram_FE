import React from "react";
import styled from "styled-components";
import { Button, Grid, Image, Text, Input, Modal } from "../elements/index";

import { history } from "../redux/configureStore";
import { actionCreators as feedActions } from "../redux/modules/feed";
import { actionCreators as commentActions } from "../redux/modules/feed";

import { RiHeart3Line, RiHeart3Fill } from "react-icons/ri";
import DelPop from "./DelPop";

import moreIcon from "../assets/icons/more.png";
import dmIcon from "../assets/icons/dm.png";
import commentIcon from "../assets/icons/comment.png";
import scrapIcon from "../assets/icons/scrap.png";
import CommentWrite from "./CommentWrite";
import { useDispatch } from "react-redux";
import TimeCounting from "time-counting";

const PostCard = (props) => {
  console.log(props.comments);

  const dispatch = useDispatch();
  const userId = localStorage.getItem("userId");

  const comment_list = props.comments;
  const comments = comment_list.slice(0, 2);

  const commentCount = comment_list.length;
  const feedLikeCount = props.feedLikes.length;

  //피드좋아요

  const [is_like, setIsLike] = React.useState("");

  const feedLike = () => {
    dispatch(feedActions.feedLikeDB(props.id, setIsLike));
  };

  const feedUnlike = () => {
    dispatch(feedActions.feedUnlikeDB(props.id, setIsLike));
  };

  //댓글 좋아요
  const [comment_like, setCommentLike] = React.useState("");

  //모달
  const [modalOpen, setModalOpen] = React.useState(false);
  const [delOpen, setDelOpen] = React.useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  // 작성시간
  const option = {
    lang: "ko",
  };
  const createdAt = TimeCounting(props.createdAt, option);

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
              src={props.user.userInfos[0].profileImg}
            />
            <Text margin="0px 10px" bold>
              {props.user.userId}
            </Text>
          </Grid>
          {props.user.userId === userId ? (
            <Grid width="10%" margin="0px 15px">
              <Icon src={moreIcon} alt="see more" onClick={openModal} />
              {modalOpen && (
                <Modal closeModal={closeModal} feedId={props.id}>
                  <DelPop closeModal={closeModal} {...props} />
                </Modal>
              )}
            </Grid>
          ) : (
            ""
          )}
        </Grid>
      </UserBox>

      {/*  포스팅이미지  */}
      <Grid>
        <Image
          shape="rectangle"
          src={props.feedImg}
          width="100%"
          _onClick={() => {
            history.push(`/postDetail/${props.id}`);
          }}
        />
      </Grid>

      {/* 하단 아이콘 */}
      <Grid is_flex>
        <Grid is_flex width="auto" padding="10px 16px">
          {props.feedLikes[0]?.likeId === userId || is_like ? (
            <RiHeart3Fill
              style={{ cursor: "pointer" }}
              size="28"
              color="#ed4a57"
              onClick={feedUnlike}
            />
          ) : (
            <RiHeart3Line
              style={{ cursor: "pointer" }}
              size="28"
              onClick={feedLike}
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
          좋아요 {feedLikeCount}개
        </Text>
      </Grid>

      {/* 본문 */}
      <Grid display="flex" padding="0 5px 0 18px">
        <Grid is_flex>
          <Text bold textAlign="left" margin="10px 0px">
            {props.user.userId}
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
          "댓글 {commentCount}개 모두보기"
        </Text>

        {/* 댓글 목록 */}
        {comments?.map((c, idx) => {
          console.log(c);
          return (
            <Grid is_flex height="10%" key={idx}>
              <Grid Control="left" display="flex">
                <Text bold margin="5px 0px">
                  {c.user.userId}
                </Text>
                <Text margin="5px 10px"> {c.content} </Text>
              </Grid>

              <Grid width="10%" padding="0 20px">
                {c.commentLikes?.likeId === userId || comment_like ? (
                  <RiHeart3Fill
                    style={{ cursor: "pointer" }}
                    size="15"
                    color="#ed4a57"
                    onClick={() => {
                      dispatch(
                        commentActions.commentUnlikeDB(
                          props.id,
                          c.id,
                          setCommentLike
                        )
                      );
                    }}
                  />
                ) : (
                  <RiHeart3Line
                    style={{ cursor: "pointer" }}
                    size="15"
                    onClick={() => {
                      dispatch(
                        commentActions.commentLikeDB(
                          props.id,
                          c.id,
                          setCommentLike
                        )
                      );
                    }}
                  />
                )}
              </Grid>
            </Grid>
          );
        })}
      </Grid>

      {/* 작성시간 */}
      <Grid padding="15px 16px 0px 18px">
        <Text color="#8e8e8e" size="10px" textAlign="left">
          {createdAt}
        </Text>
      </Grid>

      {/* 댓글 작성 */}
      <CommentWrite {...props} />
    </Grid>
  );
};

PostCard.defaultProps = {
  feedImg:
    "https://cdn.univ20.com/wp-content/uploads/2015/07/74c65e31a2ac254a807006765be8fcf5-700x448.gif",
  content: "CSS 너무 어려워....방망이 깎는 장인...🤮",
  Id: 1,
  nickName: "hanghae123",
  feedLikeCount: "0",
  createdAt: "1일 전",
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
