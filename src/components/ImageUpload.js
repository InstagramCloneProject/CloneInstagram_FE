import React from "react";
import styled from "styled-components";

// import elements
import { Input, Text } from "../elements";

// import assets
import ImgUpload from "../assets/imgupload.png";
import FileInput from "./FileInput";

const ImageUpload = () => {
  return (
    <StImageBox>
      <img src={ImgUpload} alt="" style={{ marginBottom: "10px" }}></img>
      <Text size="20px">사진과 동영상을 여기에 끌어다 놓으세요</Text>
      <FileInput />
    </StImageBox>
  );
};

export default ImageUpload;

const StImageBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
  width: 500px;
  height: 500px;
  background-color: #fff;
  border: 1px solid red;
`;
