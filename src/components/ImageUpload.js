import React from "react";
import styled from "styled-components";

import { useSelector, useDispatch } from "react-redux";
import { useRef } from "react";
import { actionCreators as imageActions } from "../redux/modules/image";

// import elements
import { Input, Text, Grid, Image } from "../elements";

// import assets
import ImgUpload from "../assets/imgupload.png";

const ImageUpload = () => {
  const dispatch = useDispatch();
  const imageInput = useRef();

  const selectFile = () => {
    const reader = new FileReader();
    const file = imageInput.current.files[0]; //체크 필요
    console.log("이미지 파일형태 확인", file);

    //URL과 파일정보 리덕스에 보내기
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      dispatch(imageActions.uploadImage(reader.result, file));
    };
  };
  // const is_uploading = useSelector((state) => state.image.uploading);
  const preview = useSelector((state) => state.image.preview);

  return (
    <Grid>
      <Grid is_flex column="column" margin="auto" width="100%" height="100%">
        {preview ? (
          <Image src={preview} alt="게시물 사진" shape="rectangle" size="100" />
        ) : (
          <Grid is_flex column="column">
            <img src={ImgUpload} alt="" style={{ marginBottom: "10px" }} />
            <Text size="20px">사진과 동영상을 여기에 끌어다 놓으세요</Text>
            <StButton htmlFor="inputfile">컴퓨터에서 선택 </StButton>
          </Grid>
        )}
      </Grid>
      <StFileInput
        id="inputfile"
        type="file"
        ref={imageInput}
        onChange={selectFile}
      />
    </Grid>
  );
};

export default ImageUpload;

const StFileInput = styled.input`
  display: none;
`;

const StButton = styled.label`
  // 라벨 태그로 변경
  border: none;
  background-color: #0095f6;
  color: #fff;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 400;
  width: 120px;
  height: 30px;
  //추가
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
