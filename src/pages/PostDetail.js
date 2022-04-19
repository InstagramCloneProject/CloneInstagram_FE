import React from "react";
import { Grid, Text, Input, Button, Image } from "../elements/index";
import { RiHeart3Fill, RiHeart3Line } from "react-icons/ri";
import styled from "styled-components";

import { history } from "../redux/configureStore";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as feedActions } from "../redux/modules/feed";

import DelPop from "../components/DelPop";
import Modal from "../elements/Modal";

function PostDetail() {
  const dispatch = useDispatch();

  const params = useParams();
  const Id = params.feedId;
  console.log(Id);

  // React.useEffect(() => {
  //   dispatch(feedActions.getDetailDB(Id));
  // }, []);

  // const feed = useSelector((state) => state.feed.list);
  // const username = useSelector((state) => state.user.user); //변수명 일치시키기

  const [is_like, setIsLike] = React.useState(false);
  const changeLike = () => {
    setIsLike(!is_like);
  };

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
            <Picture> 사진 배경화면 </Picture>

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
                      src="myprofile.png"
                    />
                    <Text margin="10px" bold>
                      hanghae123
                    </Text>
                    <Text margin="10px 0"> • </Text>
                    <Text bold margin="10px 10px" color="#0095F6">
                      팔로잉
                    </Text>
                  </Grid>
                  <Grid width="5%" margin="0px 20px" _onClick={openDel}>
                    <Icon src="more.png" alt="see more" />
                  </Grid>
                  {delOpen && (
                    <Modal closeDel={closeDel}>
                      <DelPop />
                    </Modal>
                  )}
                </Grid>

                {/* 본문내용 */}
                <Grid
                  column="column"
                  padding="10px 5px 0 4px"
                  width="100%"
                  height="86%"
                  bg="yellow"
                >
                  {/* 컨텐츠 부분 */}
                  <Grid width="100%" height="60%" bg="red">
                    <Grid
                      display="flex"
                      justifyContent="left"
                      width=""
                      height="30%"
                    >
                      <Image
                        border="1px solid #bcbcbc"
                        shape="circle"
                        size="40"
                        src="myprofile.png"
                      />
                      <Text bold textAlign="left" margin="13px">
                        hanghae123
                      </Text>
                      <Text margin="13px" textAlign="left">
                        CSS 모태!!!
                      </Text>
                    </Grid>
                    <Grid height="100%" padding="0px 10px 0px 55px">
                      <Grid
                        column="column"
                        width="100%"
                        height="35%"
                        bg="orange"
                      >
                        <Text
                          margin="20px 0px"
                          color="#8e8e8e"
                          size="10px"
                          textAlign="left"
                        >
                          15시간 전
                        </Text>
                        <Grid
                          column="column"
                          width="100%"
                          height="65%"
                          padding="0px 10px 0px 0px"
                          bg="green"
                        >
                          <Grid is_flex width="42%">
                            <Image
                              border="1px solid #bcbcbc"
                              shape="circle"
                              size="40"
                              src="myprofile.png"
                            />
                            <Text bold textAlign="left" margin="10px 0px">
                              sparta111
                            </Text>
                          </Grid>
                          <Text margin="0px 0px 0px 50px " textAlign="left">
                            CSS 너무 어려워!!!
                          </Text>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>

                  {/* 하단 고정 메뉴 */}
                  <Grid
                    width="100%"
                    height="40%"
                    position="fixed"
                    bg="pink"
                    column="column"
                  >
                    {/* 댓글창 윗부분 */}
                    <Grid is_flex height="80%" bg="black" column="column">
                      {/* 이모티콘 줄 */}
                      <Grid is_flex width="100%" height="30%" padding="0px 8px">
                        <Grid is_flex width="38%">
                          {is_like ? (
                            <RiHeart3Fill
                              style={{
                                cursor: "pointer",
                                margin: "0px 10px 0px 0px",
                              }}
                              size="28"
                              color="#ed4a57"
                              onClick={changeLike}
                            />
                          ) : (
                            <RiHeart3Line
                              style={{
                                cursor: "pointer",
                                margin: "0px 10px 0px 0px",
                              }}
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
                        <Grid width="8%" items="middle">
                          <img src="scrap.png" alt="scrap" />
                        </Grid>
                      </Grid>
                      <Grid padding="0px 8px">
                        <Text bold textAlign="left" margin="0">
                          좋아요 10개
                        </Text>
                        <Text
                          color="#8e8e8e"
                          size="10px"
                          textAlign="left"
                          margin="5px 2px "
                        >
                          15시간 전
                        </Text>
                      </Grid>
                    </Grid>
                    <CommentBox>
                      <Grid
                        display="flex"
                        width="80%"
                        height="10%"
                        padding="5px 0px 0px 8px"
                      >
                        <img
                          src="emoji.png"
                          style={{
                            cursor: "pointer",
                            padding: "5px 0px",
                          }}
                          height={"40px"}
                          alt="emoticon"
                        />
                        <Input border="none" placeholder="댓글 달기..."></Input>
                      </Grid>
                      <Text
                        bold
                        color="#0095F6"
                        cursor="pointer"
                        margin=" 15px auto"
                      >
                        게시
                      </Text>
                    </CommentBox>
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
  background-image: url(https://cdn.univ20.com/wp-content/uploads/2015/07/74c65e31a2ac254a807006765be8fcf5-700x448.gif);
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
`;
const CommentBox = styled.div`
  justify-content: left;
  display: flex;
  flex: 1, 1, 0;
  border-top: 1px solid #efefef;
  background-color: blue;
`;
