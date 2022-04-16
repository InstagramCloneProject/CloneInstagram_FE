import React from "react";
import styled from "styled-components";

const Container = (props) => {
  const { children } = props;

  const styles = {};

  return <ContainerBox>{children}</ContainerBox>;
};

Container.defaultProps = {};

const ContainerBox = styled.div`
  margin: auto;
  width: 935px;
  @media (max-width: 935px) {
    width: 100%;
    padding: 0px 16px;
    box-sizing: border-box;
  }
`;

export default Container;
