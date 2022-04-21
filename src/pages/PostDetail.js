import React from "react";
import { Grid, Text, Input, Button, Image } from "../elements/index";
import { RiHeart3Fill, RiHeart3Line } from "react-icons/ri";
import styled from "styled-components";

import { history } from "../redux/configureStore";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as feedActions } from "../redux/modules/feed";

import myProfileIcon from "../assets/icons/myprofile.png";
import moreIcon from "../assets/icons/more.png";
import dmIcon from "../assets/icons/dm.png";
import commentIcon from "../assets/icons/comment.png";
import scrapIcon from "../assets/icons/scrap.png";
import emojiIcon from "../assets/icons/emoji.png";

import DelPop from "../components/DelPop";
import Modal from "../elements/Modal";
import CommentItem from "../components/CommentItem";
import CommentWrite from "../components/CommentWrite";

function PostDetail(props) {
  const dispatch = useDispatch();

  const params = useParams();
  const id = params.feedId;
  // console.log(id);

  React.useEffect(() => {
    dispatch(feedActions.getDetailDB(id));
    // console.log("상세페이지 유즈이펙트 실행");
  }, []);

  //게시글 정보
  const feedInfo = useSelector((state) => state.feed.feedInfo); //state.store.키값
  const comment_list = feedInfo?.comments;
  const userId = localStorage.getItem("userId");
  const feedLikeCount = feedInfo?.feedLikes?.length;

  //모달 상태관리
  const [modalOpen, setModalOpen] = React.useState(true);
  const [delOpen, setDelOpen] = React.useState(false);

  //열기
  const openModal = () => {
    setModalOpen(true);
  };
  const openDel = () => {
    setDelOpen(true);
  };

  //닫기
  const closeModal = () => {
    setModalOpen(false);
    history.goBack();
  };

  const closeDel = () => {
    setModalOpen(false);
    setDelOpen(false);
  };

  //피드좋아요
  const changeLike = () => {
    setIsLike(!is_like);
  };
  const [is_like, setIsLike] = React.useState("");

  const feedLike = () => {
    dispatch(feedActions.feedLikeDB(feedInfo.id, setIsLike));
  };

  const feedUnlike = () => {
    dispatch(feedActions.feedUnlikeDB(feedInfo.id, setIsLike));
  };

  return (
    <>
      {modalOpen && (
        <Modal closeModal={closeModal}>
          <Grid
            width="800px"
            height="480px"
            display="flex"
            bg="#fff"
            borderRadius="3px"
          >
            {/* 좌측 사진 */}
            <Picture
              // style={{ backgroundImage: `url(${feedInfo?.feedImg})` }}
              style={{ backgroundImage: `url(${feedInfo?.feedImg})` }}
            />

            {/* 우측 게시글 */}
            <Grid width="45%" height="100%">
              <Wrap>
                {/* 상단네임 */}
                <Grid
                  width="100%"
                  is_flex
                  borderBottom="1px solid #bcbcbc"
                  position="fixed"
                >
                  <Grid
                    display="flex"
                    width="70%"
                    padding="0px 4px"
                    justifyContent="left"
                  >
                    <Image
                      border="1px solid #bcbcbc"
                      shape="circle"
                      size="40"
                      src={feedInfo?.user.userInfos[0].profileImg}
                    />
                    <Text margin="10px" bold>
                      {feedInfo?.user.userId}
                    </Text>
                    <Text margin="10px 0"> • </Text>
                    <Text bold margin="10px 10px" color="#0095F6">
                      팔로잉
                    </Text>
                  </Grid>
                  <Grid width="5%" margin="0px 20px" _onClick={openDel}>
                    <Icon src={moreIcon} alt="see more" />
                  </Grid>
                  {delOpen && (
                    <Modal closeModal={closeModal}>
                      <DelPop closeDel={closeDel} />
                    </Modal>
                  )}
                </Grid>

                {/* 본문내용 */}
                <Grid
                  column="column"
                  padding="0px 5px"
                  width="100%"
                  height="90%"
                >
                  {/* 컨텐츠 부분  스크롤필요!!*/}
                  <Grid width="100%" height="63%" overflow>
                    <Grid
                      column="column"
                      justifyContent="left"
                      width="100%"
                      height="50%"
                    >
                      <Grid display="flex" justifyContent="left" height="40%">
                        <Image
                          border="1px solid #bcbcbc"
                          shape="circle"
                          size="40"
                          src={feedInfo?.user.userInfos[0].profileImg}
                        />
                        <Text bold textAlign="left" margin="13px">
                          {feedInfo?.user.userId}
                        </Text>
                      </Grid>
                      <Grid height="20%">
                        <Text margin="0px 13px" textAlign="left">
                          {feedInfo?.content}
                        </Text>
                      </Grid>
                      <Grid height="10%">
                        <Text
                          margin="20px 13px"
                          color="#8e8e8e"
                          size="10px"
                          textAlign="left"
                        >
                          {feedInfo?.createdAt}
                        </Text>
                      </Grid>
                    </Grid>
                    <Grid column="column" width="100%" height="35%">
                      {/* 댓글 */}

                      {comment_list?.map((c, idx) => {
                        return (
                          <CommentItem
                            {...c}
                            idx={idx}
                            key={idx}
                            feed_Id={feedInfo.id}
                          />
                        );
                      })}
                    </Grid>
                  </Grid>

                  {/* 하단 고정 메뉴 */}
                  <Grid
                    width="100%"
                    height="40%"
                    position="fixed"
                    column="column"
                    borderTop="1px solid #efefef"
                  >
                    {/* 댓글창 윗부분 */}
                    <Grid
                      is_flex
                      height="80%"
                      column="column"
                      borderTop="1px solid #efefef"
                    >
                      {/* 이모티콘 줄 */}
                      <Grid is_flex width="100%" height="30%" padding="5px 8px">
                        <Grid is_flex width="38%">
                          {feedInfo?.feedLikes[0]?.likeId === userId ||
                          is_like ? (
                            <RiHeart3Fill
                              style={{
                                cursor: "pointer",
                                margin: "0px 10px 0px 0px",
                              }}
                              size="28"
                              color="#ed4a57"
                              onClick={feedUnlike}
                            />
                          ) : (
                            <RiHeart3Line
                              style={{
                                cursor: "pointer",
                                margin: "0px 10px 0px 0px",
                              }}
                              size="28"
                              onClick={feedLike}
                            />
                          )}
                          <Icon
                            onClick={() => {
                              history.push("/postDetail");
                            }}
                            src={commentIcon}
                            alt="comment"
                          />
                          <Icon src={dmIcon} alt="direct message" />
                        </Grid>
                        <Grid width="8%" items="middle">
                          <Icon src={scrapIcon} alt="scrap" />
                        </Grid>
                      </Grid>
                      <Grid padding="10px 8px">
                        <Text bold textAlign="left" margin="0">
                          좋아요 {feedLikeCount}개
                        </Text>
                        <Text
                          color="#8e8e8e"
                          size="10px"
                          textAlign="left"
                          margin="5px 2px "
                        >
                          {feedInfo?.createdAt}
                        </Text>
                      </Grid>
                    </Grid>
                    <Grid width="100%">
                      <CommentWrite {...feedInfo} />
                    </Grid>
                  </Grid>
                </Grid>
              </Wrap>
            </Grid>
          </Grid>
        </Modal>
      )}
    </>
  );
}

export default PostDetail;

const Picture = styled.div`
  width: 57%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const Wrap = styled.div`
  ::-webkit-scrollbar {
    display: none;
  }
  width: 100%;
  height: 100%;
`;

const Icon = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 20px;
  cursor: pointer;
`;
const CommentBox = styled.div`
  justify-content: left;
  display: flex;
  border-top: 1px solid #efefef;
`;
