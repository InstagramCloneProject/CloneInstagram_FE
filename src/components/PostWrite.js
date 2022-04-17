import React from "react";
import styled from "@emotion/styled";

function PostWrite() {
  return <div>PostWrite</div>;
}

export default PostWrite;

const ModalBg = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
  cursor: pointer;
`;
const DetailModal = styled.div`
  max-width: 1000px;
  width: 1000px;
  background: white;
  height: 600px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  z-index: 5;
`;
