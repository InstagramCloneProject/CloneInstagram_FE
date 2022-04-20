import React from "react";
import styled from "styled-components";
import { CircularProgress } from "@mui/material";
import loadingImg from "../assets/loadingImg.png";

const Spinner = (props) => {
  return (
    <Outter>
      <img src={loadingImg} alt="loadingimage" />
    </Outter>
  );
};

const Outter = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  z-index: 99999;
`;
// align-items 자식 요소 좌우정렬, justify-content 자식 요소 상하정렬

export default Spinner;
