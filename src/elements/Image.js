import styled from "styled-components";
import React from "react";

const Image = (props) => {
  const { shape, src, size, _onClick, cursor, border } = props; //onClick 추가
  const styles = { src: src, size: size, cursor: cursor, border: border };

  if (shape === "circle") {
    return <ImageCircle onClick={_onClick} {...styles}></ImageCircle>; //onClick 일괄추가
  }

  if (shape === "rectangle") {
    return (
      <RectangleOuter>
        <RectangleInner onClick={_onClick} {...styles}></RectangleInner>
      </RectangleOuter>
    );
  }

  return (
    <React.Fragment>
      <ImageDefault onClick={_onClick} {...styles}></ImageDefault>
    </React.Fragment>
  );
};
//프로필이미지
Image.defaultProps = {
  shape: "circle",
  src: "http://www.goingmary.co.kr/shop/data/images/icons/basic_user.png",
  size: 50,
  //추가
  _onClick: () => {},
  cursor: "",
  border: "",
};

//포스팅이미지
const ImageDefault = styled.div`
  --size: ${(props) => props.size}px;
  width: var(--size);
  height: var(--size);

  background-image: url("${(props) => props.src}");
  background-size: cover;
  //추가
  cursor: ${(props) => props.cursor};
  border: ${(props) => props.border};
`;

const RectangleOuter = styled.div`
  width: 100%;
  min-width: 250px;
`;
const RectangleInner = styled.div`
  position: relative;
  padding-top: 64%; //75%에서 수정함
  overflow: hidden;
  background-image: url("${(props) => props.src}");
  /* background-size: cover; */
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  //추가
  cursor: ${(props) => props.cursor};
  border: ${(props) => props.border};
`;

const ImageCircle = styled.div`
  --size: ${(props) => props.size}px;
  width: var(--size);
  height: var(--size);
  border-radius: var(--size);

  background-image: url("${(props) => props.src}");
  background-size: cover;
  margin: 4px;
  //추가
  cursor: ${(props) => props.cursor};
  border: ${(props) => props.border};
`;

export default Image;
