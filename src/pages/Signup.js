import React from "react";
import { Button, Grid, Image, Input } from "../elements";
import styled from "styled-components";
import { AiFillFacebook } from "react-icons/ai";

// import image
import LoginImg from "../assets/login_img.png";
import Logo from "../assets/logo.png";
import download1 from "../assets/download1.png";
import download2 from "../assets/download2.png";

function Signup() {
  return (
    <React.Fragment>
      <Grid
        width="100%"
        height="100vh"
        _style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fafafa",
        }}
      >
        <Grid
          width="400px"
          height=""
          _style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            transform: "translateY(-10%)",
          }}
        >
          <Grid
            width="350px"
            height="530px"
            padding="40px"
            margin="30px 30px 15px 30px"
            _style={{ border: "1px solid #bbb", backgroundColor: "#fff" }}
          >
            <img style={{ width: "180px" }} src={Logo} alt="Logo" />
            <p style={{ fontWeight: "bold", color: "#666" }}>
              친구들의 사진과 동영상을 보려면
              <br />
              가입하세요.
            </p>
            <StDiv>
              <button
                style={{
                  border: "none",
                  borderRadius: "3px",
                  backgroundColor: "#0095f6",
                  width: "100%",
                  height: "30px",
                  color: "#fff",
                  fontSize: "14px",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                <AiFillFacebook
                  size="20px"
                  style={{ transform: "translateY(4px)" }}
                />
                Facebook으로 로그인
              </button>
            </StDiv>
            <StDiv>
              <StSpan>또는</StSpan>
              <StLine></StLine>
            </StDiv>

            <StDiv>
              <StInput placeholder="휴대폰 번호 또는 이메일 주소"></StInput>
              <StInput placeholder="성명"></StInput>
              <StInput placeholder="사용자 이름"></StInput>
              <StInput placeholder="비밀번호"></StInput>
            </StDiv>
            <StButton style={{ cursor: "pointer" }}>가입</StButton>
          </Grid>

          <Grid
            width="350px"
            _style={{
              border: "1px solid #bbb",
              backgroundColor: "#fff",
              height: "60px",
            }}
          >
            <span style={{ marginLeft: "80px" }}>
              계정이 있으신가요?
              <button
                style={{
                  border: "none",
                  marginTop: "20px",
                  backgroundColor: "transparent",
                  cursor: "pointer",
                  color: "#0095f6",
                  fontWeight: "bold",
                  fontSize: "15px",
                }}
              >
                로그인
              </button>
            </span>
          </Grid>
          <Grid margin="20px 0">
            <a
              href="https://apps.apple.com/app/instagram/id389801252?vt=lo"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                style={{ width: "135px", margin: "2px" }}
                src={download1}
                alt=""
              />
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=com.instagram.android&referrer=utm_source%3Dinstagramweb&utm_campaign=loginPage&ig_mid=5BCD1227-F988-4EB5-949B-AD26E9E31EEF&utm_content=lo&utm_medium=badge"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                style={{ width: "135px", margin: "2px" }}
                src={download2}
                alt=""
              />
            </a>
          </Grid>
        </Grid>
        <Grid
          width="100%"
          height="150px"
          _style={{
            color: "#aaa",
            fontSize: "14px",
            position: "fixed",
            bottom: "0",
          }}
        >
          <StFooter>Meta</StFooter>
          <StFooter>소개</StFooter>
          <StFooter>블로그</StFooter>
          <StFooter>채용정보</StFooter>
          <StFooter>도움말</StFooter>
          <StFooter>API</StFooter>
          <StFooter>개인정보처리방침</StFooter>
          <StFooter>약관</StFooter>
          <StFooter>인기 계정</StFooter>
          <StFooter>해시태그</StFooter>
          <StFooter>위치</StFooter>
          <StFooter>Instagram Lite</StFooter>
          <br />
          <StFooter>댄스</StFooter>
          <StFooter>식음료</StFooter>
          <StFooter>집 및 정원</StFooter>
          <StFooter>음악</StFooter>
          <StFooter>시각 예술</StFooter>
          <br />
          <select style={{ border: "none", color: "#aaa" }}>
            <option value="한국어">한국어</option>
            <option value="English">English</option>
          </select>
          <StFooter>&copy;2022 Instagram from Meta</StFooter>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default Signup;

const StDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 15px 0 20px 0;
  position: relative;
`;

const StInput = styled.input`
  width: 100%;
  height: 40px;
  box-sizing: border-box;
  margin-bottom: 5px;
  border: 1px solid #bbb;
  border-radius: 3px;
`;

const StButton = styled.button`
  width: 100%;
  height: 30px;
  background-color: #b2dffc;
  border: none;
  border-radius: 3px;
  color: #fff;
  font-weight: bold;
`;

const StLine = styled.div`
  position: absolute;
  z-index: 0;
  top: 50%;
  border-top: 1px solid rgba(0, 0, 0, 0.4);
  width: 100%;
`;

const StSpan = styled.span`
  z-index: 1;
  font-size: 13px;
  font-weight: bold;
  color: rgba(0, 0, 0, 0.6);
  width: 50px;
  background-color: #fff;
`;

const StFooter = styled.span`
  padding: 7px;
`;
