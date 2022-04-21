import React from "react";
import styled from "styled-components";
import { Button, Grid, Image, Text } from "../elements/index";
import { history } from "../redux/configureStore";

import myProfileIcon from "../assets/icons/myprofile.png";

const Aside = (props) => {
  const userId = localStorage.getItem("userId");
  const profileImg = localStorage.getItem("profileImgUrl");
  return (
    <Grid width="400px" height="100%" bg="#fafafa" padding="20px 25px">
      <Grid width="100%">
        <Grid is_flex width="auto">
          <Grid is_flex width="auto">
            <Image
              border="1px solid #bcbcbc"
              shape="circle"
              size="60"
              src={profileImg} //프로필 url 받아오기
              cursor="poiner"
            />
            <Text margin="0px 10px" bold>
              {userId}
            </Text>
          </Grid>
          <Grid>
            <Text
              textAlign="right"
              width="100px"
              bold
              color="#0095F6"
              cursor="pointer"
            >
              전환
            </Text>
          </Grid>
        </Grid>
        <Grid is_flex padding="5px">
          <Text
            textAlign="left"
            color="#8e8e8e"
            size="14px"
            bold
            margin="20px 0px 0px 0px"
          >
            회원님을 위한 추천
          </Text>
        </Grid>

        {/* 다른 유저 네임택 */}
        <Grid is_flex>
          <Grid is_flex width="auto">
            <Image shape="circle" size="35" />
            <Text margin="0px 10px" bold>
              sparta
            </Text>
          </Grid>
          <Grid>
            <Text
              textAlign="right"
              width="100px"
              bold
              color="#0095F6"
              cursor="pointer"
              margin="5px 0px"
            >
              팔로우
            </Text>
          </Grid>
        </Grid>

        {/* elements 스타일 공통 적용은 어떤식으로 하나? */}
        <Grid padding="50px 5px">
          <Text textAlign="left" size="11px" color="#c7c7c7" margin="5px 0px">
            소개 · 도움말 · 홍보 센터 · API · 채용 정보 ·
          </Text>
          <Text textAlign="left" size="11px" color="#c7c7c7">
            개인정보처리방침 · 약관 · 위치 · 인기계정 ·해시태그 ·언어
          </Text>
          <Text textAlign="left" margin="50px 0px" size="11px" color="#c7c7c7">
            © 2021 INSTAGRAM FROM META
          </Text>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Aside;
