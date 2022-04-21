import React from "react";

import styled from "styled-components";
import { Grid, Image, Input } from "../elements/index";

import { history } from "../redux/configureStore";
import Modal from "../elements/Modal";
import PostWrite from "./PostWrite";

import homeIcon from "../assets/icons/home.png";
import dmIcon from "../assets/icons/dm.png";
import uploadIcon from "../assets/icons/upload.png";
import logoIcon from "../assets/icons/literal_logo.png";

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
        <Grid is_flex padding="5px" bg="white">
          <Logo
            src={logoIcon}
            onClick={() => {
              history.push("/");
            }}
          ></Logo>
          <Grid margin="0px 200px" width="26%" height="70%">
            <Input
              placeholder=" 검색"
              bg="#efefef"
              border="none"
              color="#8e8e8e"
            />
          </Grid>
          <Grid is_flex gap="20px" width="auto">
            <Btn
              src={homeIcon}
              onClick={() => {
                history.push("/");
              }}
            />
            <Btn
              src={dmIcon}
              onClick={() => {
                history.push("/main");
              }}
            />
            <Btn src={uploadIcon} onClick={openModal} />
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

const Container = styled.div`
  margin: auto;
  width: 935px;
  @media (max-width: 935px) {
    padding: 0px 16px;
    box-sizing: border-box;
  }
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
