import React from "react";
import styled from "styled-components";
import { Button, Grid, Image, Text } from "../elements/index";
import { history } from "../redux/configureStore";

const Aside = (props) => {
  return (
    <Grid width="400px" bg="#fafafa" padding="0px 25px">
      <Grid width="100%">
        <Grid is_flex width="auto">
          <Grid is_flex width="auto">
            <Image
              border="1px solid #bcbcbc"
              shape="circle"
              size="60"
              src="myprofile.png"
              cursor="poiner"
            />
            <Text margin="0px 10px" bold>
              hanghae
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
        <Grid flex justify="space-between" padding="5px 0">
          <Text textAlign="left" color="#8e8e8e" size="19px" bold>
            회원님을 위한 추천
          </Text>
        </Grid>

        {/* 다른 유저 네임택 */}
        <Grid is_flex>
          <Grid is_flex width="auto">
            <Image shape="circle" size="40" />
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
            >
              팔로우
            </Text>
          </Grid>
        </Grid>

        {/* elements 스타일 공통 적용은 어떤식으로 하나? */}
        <Grid padding="50px 5px">
          <Text textAlign="left" size="11px" color="#c7c7c7">
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
