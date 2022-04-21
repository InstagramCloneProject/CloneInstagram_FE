import React from "react";
import styled from "styled-components";
import { Button, Grid, Image, Text, Input } from "../elements/index";
import { history } from "../redux/configureStore";
import ImageUpload from "./ImageUpload";

import { useSelector, useDispatch } from "react-redux";
import { actionCreators as feedActions } from "../redux/modules/feed";

import myProfileIcon from "../assets/icons/myprofile.png";
import emojiIcon from "../assets/icons/emoji.png";
import arrowIcon from "../assets/icons/arrow.png";
import underarrowIcon from "../assets/icons/underarrow.png";
import gpsIcon from "../assets/icons/gps.png";

//레이아웃 보려고 배경색을 다 넣어뒀습니다.
// 프롭스로 모달 여닫는 함수 넘겨줘야함
function PostWrite({ closeModal, children }) {
  const dispatch = useDispatch();

  const [content, setContent] = React.useState("");

  const file = useSelector((state) => state.image.file);
  // const userId = useSelector((state) => state.user.userId); //로그인 체크 유즈이펙트 있을때 쓸 수 있음 (리듀서 정보 쓰기)
  const userId = localStorage.getItem("userId");
  const profileImg = localStorage.getItem("profileImgUrl");

  const changeContents = (e) => {
    setContent(e.target.value);
  };

  const uploadFeed = (e) => {
    e.preventDefault();
    if (content == "" || file == "") {
      window.alert("이미지와 컨텐츠 모두 작성해주세요!");
      return;
    }
    dispatch(feedActions.addFeedDB(file, content));
    closeModal();
  };

  return (
    <form onSubmit={uploadFeed}>
      <Grid
        width="700px"
        height="445px"
        borderRadius="10px"
        padding="0px"
        bg="#fff"
        column="column"
      >
        <Grid
          width="100%" //갑자기 100%가 안맞음
          is_flex
          borderBottom="1px solid #bcbcbc"
          position="fixed"
        >
          <Grid>
            <img
              style={{ margin: "0px 20px", cursor: "pointer" }}
              src={arrowIcon}
              alt="화살표"
              onClick={() => {
                closeModal();
              }}
            />
          </Grid>
          <Grid>
            <Text margin="10px 0px" bold size="15px">
              새 게시물 만들기
            </Text>
          </Grid>
          <Grid>
            <Text
              textAlign="right"
              margin="10px 20px"
              bold
              cursor="pointer"
              color="#0095F6"
              _onClick={uploadFeed}
            >
              공유하기
            </Text>
          </Grid>
        </Grid>
        {/* 하단이 꽉채워지지 않아서 margin으로 위아래 여백줌 */}
        <Grid is_flex width="100%" height="100%">
          {/* 이미지 업로드 */}
          <Grid width="60%" height="100%">
            <ImageUpload />
          </Grid>

          {/* 컨텐츠 작성 */}
          <Grid
            width="40%"
            height="100%"
            borderLeft="1px solid #bcbcbc"
            padding="0px 4px"
          >
            <Grid width="100%" height="100%">
              <Grid
                display="flex"
                justifyContent="left"
                width="57%"
                height="100%"
              >
                <Image
                  border="1px solid #bcbcbc"
                  shape="circle"
                  size="40"
                  src={profileImg} //프로필 url 가져오기
                />
                <Text margin="10px 0px 0px 10px" bold textAlign="left">
                  {userId}
                </Text>
              </Grid>
              <Grid>
                <Input
                  multiLine
                  rows="6"
                  placeholder="문구 입력..."
                  border="none"
                  value={content}
                  _onChange={changeContents}
                />
              </Grid>
            </Grid>

            {/* 하단박스 */}
            <Grid width="100%" height="100%">
              <Grid width="100%" borderBottom="1px solid #bcbcbc">
                <img
                  style={{ height: "32px", margin: "10px 10px" }}
                  src={emojiIcon}
                  alt="이모티콘"
                />
              </Grid>
              <Grid
                padding="0px 10px"
                width="100%"
                borderBottom="1px solid #bcbcbc"
                is_flex
              >
                <Text margin="10px 0px" textAlign="left" bold color="#bcbcbc">
                  위치 추가
                </Text>
                <img src={gpsIcon} style={{ margin: "0px 3px" }} />
              </Grid>
              <Grid
                padding="0px 10px"
                width="100%"
                borderBottom="1px solid #bcbcbc"
                is_flex
              >
                <Text margin="10px 0px" textAlign="left" bold color="black">
                  접근성
                </Text>
                <img src={underarrowIcon} />
              </Grid>
              <Grid padding="0px 10px" width="100%" is_flex>
                <Text margin="10px 0px" textAlign="left" bold color="black">
                  고급설정
                </Text>
                <img src={underarrowIcon} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
}
export default PostWrite;
