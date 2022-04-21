import React from "react";
import { useDispatch } from "react-redux";

import styled from "styled-components";
import { Grid, Image, Input } from "../elements/index";

import { history } from "../redux/configureStore";
import Modal from "../elements/Modal";
import PostWrite from "./PostWrite";
import { actionCreators } from "../redux/modules/user";

import homeIcon from "../assets/icons/home.png";
import dmIcon from "../assets/icons/dm.png";
import uploadIcon from "../assets/icons/upload.png";
import logoIcon from "../assets/icons/literal_logo.png";

const Header = (props) => {
  const dispatch = useDispatch();
  const { children } = props;

  const __userID = localStorage.getItem("user_Id");

  const [drop, setDrop] = React.useState(false);
  const [modalOpen, setModalOpen] = React.useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    // history.goBack(); // 얘는 라우팅이 없어서 뒤로가기 안해도 될듯
  };

  const openDrop = () => {
    setDrop(true);
  };

  const closeDrop = () => {
    setDrop(false);
  };

  const userLogout = () => {
    dispatch(actionCreators.__logout());
    closeDrop();
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
            <div style={{ position: "relative" }}>
              <Image
                shape="circle"
                size="24"
                paddingLeft="20px"
                // 프로필 탭 열기 onClick function
                _onClick={openDrop}
                cursor="pointer"
              ></Image>
              {drop === false ? null : (
                <StHeaderTab>
                  <CloseDrop onClick={closeDrop}>X</CloseDrop>
                  <Grid
                    _style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItmes: "center",
                    }}
                  >
                    <StHeaderDrop
                      onClick={() => {
                        history.push(`/profile/${__userID}`);
                        closeDrop();
                      }}
                    >
                      <Image
                        shape="circle"
                        size="24"
                        paddingLeft="20px"
                        _onClick={() => {
                          history.push(`/profile/${__userID}`);
                        }}
                        cursor="pointer"
                      />{" "}
                      <span style={{ paddingLeft: "10px" }}>프로필</span>
                    </StHeaderDrop>
                    <Grid
                      _style={{
                        display: "flex",
                        justifyContent: "start",
                        padding: "10px 0 0 0",
                        cursor: "pointer",
                      }}
                    >
                      <span
                        style={{
                          padding: "10px 0 0 20px",
                          borderTop: "1px solid #bbb",
                          width: "100%",
                        }}
                        onClick={userLogout}
                      >
                        로그아웃
                      </span>
                    </Grid>
                  </Grid>
                </StHeaderTab>
              )}
            </div>
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

const StHeaderTab = styled.div`
  border: 1px solid red;
  position: fixed;
  width: 230px;
  height: 130px;
  border: none;
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 0 2px 10px -3px rgba(0, 0, 0, 0.3);
  transform: translateX(-180px) translateY(10px);
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const StHeaderDrop = styled.div`
  display: flex;
  justify-content: start;
  padding: 10px 0 0 10px;
  cursor: pointer;
  align-items: center;
`;

const CloseDrop = styled.span`
  width: 30px;
  height: 30px;
  cursor: pointer;
  padding: 0 0 0 8px;
`;
