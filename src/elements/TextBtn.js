import React from "react";
import styled from "styled-components";

const TextBtn = ({ children = null, ...props }) => {
  const { margin } = props;

  const styles = {
    margin: margin,
  };

  return (
    <React.Fragment>
      <StTextBtn></StTextBtn>
    </React.Fragment>
  );
};

TextBtn.defaultProps = {
  margin: false,
};

const StTextBtn = styled.button`
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")}
`;

export default TextBtn;
