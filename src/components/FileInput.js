import styled from "@emotion/styled";
import React from "react";

// import useRef
import { useRef } from "react";

const FileInput = () => {
  const imageInput = useRef();

  const onClickImgUpload = () => {
    imageInput.current.click();
  };
  return (
    <React.Fragment>
      <StFileInput type="file" ref={imageInput} />
      <StButton onClick={onClickImgUpload}>컴퓨터에서 선택</StButton>
    </React.Fragment>
  );
};

export default FileInput;

const StFileInput = styled.input`
  display: none;
`;

const StButton = styled.button`
  border: none;
  background-color: #0095f6;
  color: #fff;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 400;
  width: 120px;
  height: 30px;
`;
