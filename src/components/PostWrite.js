import React from "react";
import styled from "styled-components";
import { Button, Grid, Image, Text, Input } from "../elements/index";
import { history } from "../redux/configureStore";
import ImageUpload from "./ImageUpload";

//레이아웃 보려고 배경색을 다 넣어뒀습니다.

function PostWrite() {
  return (
    <Grid width="50vw" height="65vh" margin="80px auto" bg="blue">
      <Grid
        is_flex
        borderBottom="1px solid #bcbcbc"
        position="fixed"
        bg="orange"
      >
        <Grid>
          <img
            style={{ margin: "0px 20px", cursor: "pointer" }}
            src="arrow.png"
            alt="화살표"
            onClick={() => {
              history.goback();
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
          >
            공유하기
          </Text>
        </Grid>
      </Grid>
      <Grid is_flex width="50vw" bg="yellow">
        <Grid width="30vw" height="60vh" bg="green">
          <ImageUpload />
        </Grid>

        {/* 컨텐츠 작성 */}
        <Grid width="20vw" height="60vh">
          <Grid width="20vw" height="35vh">
            <Grid is_flex width="50%">
              <Image
                border="1px solid #bcbcbc"
                shape="circle"
                size="40"
                src="myprofile.png"
              />
              <Text margin="3px 0px 0px 0px" bold textAlign="left">
                hanghae123555
              </Text>
            </Grid>
            <Input
              multiLine
              rows="6"
              placeholder="문구 입력..."
              border="none"
            />
          </Grid>
          {/* 하단박스 */}
          <Grid width="20vw" height="25vh" bg="red">
            <Grid width="20vw" height="7vh" borderBottom="1px solid #bcbcbc">
              <img
                style={{ height: "32px", margin: "10px 10px" }}
                src="emoji.png"
                alt="이모티콘"
              />
            </Grid>
            <Grid
              padding="0px 10px"
              width="20vw"
              height="7vh"
              borderBottom="1px solid #bcbcbc"
              is_flex
            >
              <Text margin="10px 0px" textAlign="left" bold color="#bcbcbc">
                위치 추가
              </Text>
              <img src="gps.png" style={{ margin: "0px 3px" }} />
            </Grid>
            <Grid
              padding="0px 10px"
              width="20vw"
              height="7vh"
              borderBottom="1px solid #bcbcbc"
              is_flex
            >
              <Text margin="10px 0px" textAlign="left" bold color="black">
                접근성
              </Text>
              <img src="underarrow.png" />
            </Grid>
            <Grid padding="0px 10px" width="20vw" height="7vh" is_flex>
              <Text margin="10px 0px" textAlign="left" bold color="black">
                고급설정
              </Text>
              <img src="underarrow.png" />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );

export default PostWrite;

const ModalBg = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
  cursor: pointer;
`;
const DetailModal = styled.div`
  max-width: 1000px;
  width: 1000px;
  background: white;
  height: 600px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  z-index: 5;
`;
