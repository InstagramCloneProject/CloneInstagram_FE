import React from "react";
import styled from "styled-components";

const Grid = (props) => {
  const {
    is_flex,
    width,
    margin,
    padding,
    bg,
    children,
    center,
    borderLine,
    borderRadius,
    boxShadow,
    display,
    //추가
    _style,
    height,
    gap,
    flexFlow,
    justifyContent,
    column,
    borderBottom,
    baseline,
    float,
    Control,
    overflow,
    Reaction,
  } = props;

  const styles = {
    is_flex: is_flex,
    width: width,
    margin: margin,
    padding: padding,
    bg: bg,
    center: center,
    borderLine: borderLine,
    borderRadius: borderRadius,
    boxShadow: boxShadow,
    display: display,
    //추가
    gap: gap,
    justifyContent: justifyContent,
    height: height,
    flexFlow: flexFlow,
    column,
    baseline,
    borderBottom,
    Reaction,
    float,
    overflow,
    Control,
  };
  return (
    <React.Fragment>
      <GridBox style={_style} {...styles}>
        {children}
      </GridBox>
    </React.Fragment>
  );
};

Grid.defaultProps = {
  children: null,
  is_flex: false,
  width: "100%",
  padding: false,
  margin: false,
  bg: false,
  center: false,
  borderLine: false,
  borderRadius: false,
  boxShadow: false,
  display: "block",
  center_align: false,
  //추가
  height: "100%",
  flexFlow: false,
  column: false,
  baseline: false,
  borderBottom: false,
  overflow: "",
  Control: false,
};

const GridBox = styled.div`
  width: ${(props) => props.width};
  box-sizing: border-box;
  ${(props) => (props.padding ? `padding: ${props.padding};` : "")}
  ${(props) => (props.margin ? `margin : ${props.margin};` : "")}
  ${(props) => (props.bg ? `background-color : ${props.bg};` : "")}
  ${(props) => (props.display ? `display : ${props.display};` : "")}
  ${(props) =>
    props.is_flex
      ? `display : flex; align-items: center; justify-content: space-between`
      : ""}
      ${(props) => (props.center ? `text-align: center` : "")}
      ${(props) =>
    props.borderLine ? `border-Line: ${props.borderLine};` : ""}
      ${(props) =>
    props.borderRadius ? `border-Radius: ${props.borderRadius};` : ""}
    ${(props) => (props.boxShadow ? `box-shadow: ${props.boxShadow}` : "")}
    ${(props) =>
    props.center_align
      ? `display : flex; align-items: center; justify-content: space-between`
      : ""}
      //추가 
    height: ${(props) => props.height};
  float: ${(props) => props.float};
  border-bottom: ${(props) => props.borderBottom};
  flex-direction: ${(props) => props.column};
  gap: ${(props) => props.gap};
  ${(props) => (props.flexFlow ? "flex-flow : row wrap;" : "")}
  ${(props) =>
    props.justifyContent
      ? "justify-content: flex-start;"
      : "justify-content: space-between;"};
  ${(props) => (props.baseline ? `align-items: baseline;` : "")}
  ${(props) => (props.overflow ? `overflow:scroll;` : "")}
    justify-content :${(props) => props.Control}
    ${(props) =>
    props.Reaction
      ? "@media (max-width: 935px) { width: 100%;padding: 3%}"
      : ""}
`;

export default Grid;
