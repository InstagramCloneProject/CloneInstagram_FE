import React from "react";

import styled from "styled-components";
import { Grid, Image, Input } from "../elements/index";

// 추가 import react-redux
import { useDispatch, useSelector } from "react-redux";

import Container from "../elements/Container";
import PostCard from "./PostCard";

import { history } from "../redux/configureStore";
import Modal from "../elements/Modal";
import PostWrite from "./PostWrite";

const Header = (props) => {
  const { children } = props;

  const __userID = localStorage.getItem("user_Id");

  const [modalOpen, setModalOpen] = React.useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    // history.goBack(); // 얘는 라우팅이 없어서 뒤로가기 안해도 될듯
  };

  return (
    <HeaderWeb>
      <Container>
        <Grid is_flex is_fix padding="0.5rem" bg="white">
          <Logo
            src="literal_logo.png"
            onClick={() => {
              history.push("/");
            }}
          ></Logo>
          <Grid margin="0px 200px">
            <Input placeholder=" 검색" />
          </Grid>
          <Grid is_flex gap="20px" width="auto">
            <Btn
              src="home.png"
              onClick={() => {
                history.push("/main");
              }}
            />
            <Btn
              src="dm.png"
              onClick={() => {
                history.push("/main");
              }}
            />
            <Btn src="upload.png" onClick={openModal} />
            {modalOpen && (
              <Modal closeModal={closeModal}>
                <PostWrite closeModal={closeModal} />
              </Modal>
            )}
            <Image
              shape="circle"
              size="24"
              paddingLeft="20px"
              _onClick={() => {
                history.push(`/profile/${__userID}`);
              }}
              cursor="pointer"
            ></Image>
          </Grid>
        </Grid>
      </Container>
    </HeaderWeb>
  );
};

export default Header;

const HeaderWeb = styled.div`
  background-color: #fff;
  border-bottom: solid rgba(188, 191, 187, 0.93) 1px;
  position: fixed;
  width: 100%;
  left: 0px;
  z-index: 99;
  top: 0px;
`;
const Logo = styled.img`
  width: 100px;
  height: 23%;
  cursor: pointer;
`;

const Btn = styled.img`
  width: 30px;
  cursor: pointer;
`;
