import React from "react";
import styled from "styled-components";

import { Grid, Text, Input, Image, Button } from "../elements";

function ProfileEdit() {
  return (
    <Grid width="100%" padding="100px 0 0 0" _style={{ height: "830px" }}>
      <Grid
        is_flex
        width="930px"
        margin="auto"
        _style={{
          border: "1px solid #bbb",
          borderRadius: "4px",
          backgroundColor: "#fff",
          height: "100%",
        }}
      >
        <Grid
          padding="20px 0 0 25px"
          _style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            borderRight: "1px solid #bbb",
            width: "300px",
            height: "100%",
          }}
        >
          <Text size="16px">프로필 편집</Text>
          <Text size="16px">비밀번호 변경</Text>
          <Text size="16px">앱 및 웹사이트</Text>
          <Text size="16px">이메일 및 SMS</Text>
          <Text size="16px">푸시 알림</Text>
          <Text size="16px">연락처 관리</Text>
          <Text size="16px">개인정보 및 보안</Text>
          <Text size="16px">로그인 활동</Text>
          <Text size="16px" _style={{ textAlign: "start" }}>
            Instagram에서 보낸
            <br /> 이메일
          </Text>
          <Text size="16px">도움말</Text>
          <Text size="14px" color="#0095f6" bold>
            프로페셔널 계정으로 전환
          </Text>
        </Grid>
        <Grid is_flex width="100%">
          <Grid
            width="30%"
            margin="80px 20px 0 0"
            _style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "start",
              alignItems: "end",
            }}
          >
            <Image size="36" />
            <Text margin="20px 0 0 0">이름</Text>
            <Text margin="105px 0 0 0">사용자 이름</Text>
            <Text margin="25px 0 0 0">웹사이트</Text>
            <Text margin="20px 0 0 0">소개</Text>
            <Text margin="120px 0 0 0">이메일</Text>
            <Text margin="24px 0 0 0">전화번호 </Text>
            <Text margin="24px 0 0 0">성별</Text>
            <Text margin="20px 0 0 0">비슷한 계정 추천</Text>
          </Grid>
          <Grid
            width="70%"
            _style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
              alignItems: "start",
            }}
          >
            <Text size="16px" margin="20px 0 0 0" bold>
              Hanghae99
            </Text>
            <Text size="13px" margin="-15px 0 0 0" color="#0095f6" bold>
              프로필 사진 바꾸기
            </Text>
            <StInput></StInput>
            <Text _style={{ textAlign: "start" }} size="12px" color="#999">
              사람들이 이름, 별명 또는 비즈니스 이름 등 회원님의 알려진 이름
              <br />을 사용하여 회원님의 계정을 찾을 수 있도록 도와주세요.
              <br />
              이름은 14일 안에 두 번만 변경할 수 있습니다.
            </Text>
            <StInput></StInput>
            <StInput placeholder="웹사이트"></StInput>
            <textarea
              rows="2"
              style={{
                width: "355px",
                border: "1px solid #bbb",
                borderRadius: "5px",
              }}
            ></textarea>
            <Text _style={{ textAlign: "start" }} size="12px" color="#999">
              비즈니스나 반려동물 등에 사용된 계정인 경우에도 회원님의 개인
              <br />
              정보를 입력하세요. 공개 프로필에는 포함되지 않습니다.
            </Text>
            <StInput placeholder="이메일"></StInput>
            <StInput placeholder="전화번호"></StInput>
            <StInput placeholder="성별"></StInput>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <input type="checkbox" />
              <Text _style={{ textAlign: "start", marginLeft: "10px" }} bold>
                팔로우할 만한 비슷한 계정을
                <br />
                추천할 때 회원님의 계정을 포<br />
                함합니다.
              </Text>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <StButton>제출</StButton>
              <Text margin="0 0 0 80px" color="#0095f6" bold>
                계정을 일시적으로 비활성화
              </Text>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default ProfileEdit;

const StInput = styled.input`
  border: 1px solid #bbb;
  width: 355px;
  border-radius: 5px;
`;

const StButton = styled.button`
  width: 50px;
  height: 30px;
  border-radius: 5px;
  opacity: 0.5;
  vertical-align: middle;
  border: none;
  background-color: #0095f6;
  color: #fff;
`;
