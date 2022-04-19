import React from "react";
import styled from "styled-components";
import { Grid, Text } from "../elements/index";
import { history } from "../redux/configureStore";

import { actionCreators as feedActions } from "../redux/modules/feed";
import Modal from "../elements/Modal";
import PostCard from "./PostCard";

function DelPop() {
  //모달 상태관리
  const [modalOpen, setModalOpen] = React.useState(true);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    console.log(modalOpen);
    setModalOpen(false);
  };

  return (
    <div>
      <Grid
        column="column"
        width="300px"
        height="250px"
        bg="white"
        borderRadius="10px"
        margin="50px"
      >
        <Grid
          display="flex"
          height="20%"
          width="100%"
          _onClick={() => {
            console.log("클릭");
          }}
          cursor="pointer"
          borderBottom="1px solid #8e8e8e"
        >
          <Text
            bold
            height="20%"
            margin="auto"
            cursor="pointer"
            color="#dd5d67"
          >
            삭제
          </Text>
        </Grid>

        <Grid
          display="flex"
          height="20%"
          width="100%"
          _onClick={() => {
            console.log("클릭");
          }}
          cursor="pointer"
          borderBottom="1px solid #8e8e8e"
        >
          <Text height="20%" margin="auto" cursor="pointer">
            수정
          </Text>
        </Grid>

        <Grid
          display="flex"
          height="20%"
          width="100%"
          _onClick={() => {
            console.log("클릭");
          }}
          cursor="pointer"
          borderBottom="1px solid #8e8e8e"
        >
          <Text height="20%" margin="auto" cursor="pointer">
            좋아요 수 숨기기
          </Text>
        </Grid>

        <Grid
          display="flex"
          height="20%"
          width="100%"
          _onClick={() => {
            console.log("클릭");
          }}
          cursor="pointer"
          borderBottom="1px solid #8e8e8e"
        >
          <Text height="20%" margin="auto" cursor="pointer">
            댓글기능 해제
          </Text>
        </Grid>

        <Grid
          display="flex"
          height="20%"
          width="100%"
          _onClick={closeModal}
          cursor="pointer"
        >
          <Text height="20%" margin="auto" cursor="pointer">
            취소
          </Text>
        </Grid>
      </Grid>
    </div>
  );
}

export default DelPop;
