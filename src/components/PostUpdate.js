import React from "react";
import styled from "styled-components";
import { Button, Grid, Image, Text, Input } from "../elements/index";
import { history } from "../redux/configureStore";
import ImageUpload from "./ImageUpload";

import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { actionCreators as feedActions } from "../redux/modules/feed";
import Modal from "../elements/Modal";

import myProfileIcon from "../assets/icons/myprofile.png";
import emojiIcon from "../assets/icons/emoji.png";
import arrowIcon from "../assets/icons/arrow.png";
import underarrowIcon from "../assets/icons/underarrow.png";
import gpsIcon from "../assets/icons/gps.png";

//레이아웃 보려고 배경색을 다 넣어뒀습니다.
// 프롭스로 모달 여닫는 함수 넘겨줘야함
function PostUpdate(props) {
  // console.log(props);
  const dispatch = useDispatch();

  const userId = useSelector((state) => state.user.nickName); //nickname인지 확인 필요
  const profileImg = localStorage.getItem("profileImgUrl");

  //   //사진 재등록 여부 체크
  //   if (preview === feedInfo.feedImg) {
  //     const img_url = feedInfo.feedImg;
  //   } else {
  //     const img_rul = preview;
  //   }

  const [content, setContent] = React.useState("");

  const changeContents = (e) => {
    setContent(e.target.value);
  };

  const editFeed = (e) => {
    e.preventDefault();
    if (content == "") {
      window.alert("컨텐츠를 모두 작성해주세요!");
      return;
    }
    dispatch(feedActions.editFeedDB(props.feedId, content, props.closeModal));
  };

  return (
    <Grid
      width="700px"
      height="445px"
      borderRadius="10px"
      padding="0px"
      column="column"
      bg="#fff"
    >
      <Grid
        width="100%"
        is_flex
        borderBottom="1px solid #bcbcbc"
        position="fixed"
      >
        <Grid>
          <Text
            textAlign="left"
            margin="10px 20px"
            bold
            cursor="pointer"
            color="#0095F6"
            _onClick={props.closeModal}
          >
            취소
          </Text>
        </Grid>
        <Grid>
          <Text margin="10px 0px" bold size="15px">
            정보 수정
          </Text>
        </Grid>
        <Grid>
          <Text
            textAlign="right"
            margin="10px 20px"
            bold
            cursor="pointer"
            color="#0095F6"
            _onClick={editFeed}
          >
            완료
          </Text>
        </Grid>
      </Grid>
      {/* 하단이 꽉채워지지 않아서 margin으로 위아래 여백줌 */}
      <Grid is_flex width="100%" height="100%" margin="0px 0px">
        {/* 이미지 업로드 */}
        <Grid width="60%" height="100%">
          <Image shape="rectangle" src={props.feedImg} size="100" />
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
                src={props.user.userInfos[0].profileImg}
              />
              <Text margin="10px 0px 0px 10px" bold textAlign="left">
                {props.user.userId}
              </Text>
            </Grid>
            <textarea
              defaultValue={props.content}
              style={{
                fontSize: "15px",
                width: "100%",
                padding: "12px 8px",
                resize: "none",
                border: "none",
                size: "15px",
                placeholder: "문구 입력...",
                borderRadius: "10px",
              }}
              rows="6"
              onChange={changeContents}
            />
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
  );
}
export default PostUpdate;
