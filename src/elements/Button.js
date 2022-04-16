import React from "react";
import styled from "styled-components";

const Button = (props) => {
  const {
    text,
    _onClick,
    is_float,
    children,
    margin,
    width,
    padding,
    font,
    border,
    borderRadius,
    cursor,
    //추가
    _style,
    img,
    className,
    disabled,
    bg,
    color,
    size,
  } = props;

  if (is_float) {
    return (
      <React.Fragment>
        <FloatButton style={_style} onClick={_onClick}>
          {text ? text : children}
        </FloatButton>
      </React.Fragment>
    );
  }

  const styles = {
    margin: margin,
    width: width,
    padding: padding,
    font,
    border,
    borderRadius,
    cursor: cursor,
    //추가
    img: img,
    bg,
    color,
    border,
    size,
  };

  return (
    <React.Fragment>
      <ElButton {...styles} style={_style} onClick={_onClick}>
        {text ? text : children}
      </ElButton>
    </React.Fragment>
  );
};

Button.defaultProps = {
  text: false,
  children: null,
  _onClick: () => {},
  is_float: false,
  margin: false,
  width: "100%",
  padding: "12px 0px",
  font: "inherit",
  border: false,
  borderRadius: false,
  cursor: "pointer",
  //추가
  className: "",
  disabled: false,
  img: false,
  bg: false,
  color: "#ffffff",
  size: "12px",
};

const ElButton = styled.button`
  width: ${(props) => props.width};
  /* background-color: #adb5bd; //삭제 */
  color: black;
  border: 1px solid black;
  padding: ${(props) => props.padding};
  box-sizing: border-box;
  padding: ${(props) => props.padding};
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")}
  font-family: "DungGeunMo";
  border-radius: 10px;
  ${(props) => (props.cursor ? `cursor: ${props.cursor};` : "")}
  //추가
  background-color: ${(props) =>
    props.className === "unActiveBtn" ? "#B2DFFC" : "#0095F6"};
  ${(props) => (props.img ? `background-image : ${props.img};` : "")}
  color: ${(props) => props.color};
  background: ${(props) => props.bg};
  font-size: ${(props) => props.size};
`;

const FloatButton = styled.button`
  width: 50px;
  height: 50px;
  background-color: #212121; //수정
  color: #ffffff;
  box-sizing: border-box;
  font-size: 36px;
  font-weight: 800;
  position: fixed;
  bottom: 50px;
  right: 16px;
  text-align: center;
  vertical-align: middle;
  border-radius: 50px;
  border-radius: 10px;
  //추가
  cursor: pointer;
`;

export default Button;
