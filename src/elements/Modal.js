import React from "react";
import styled from "styled-components";
import { CgClose } from "react-icons/cg";

import { history } from "../redux/configureStore";

const Modal = ({
  // className,
  closeModal,
  children,
  width,
  height,
}) => {
  const oncloseModal = (e) => {
    console.log("e.target: ", e.target);
    console.log("e.currentTarget: ", e.currentTarget);
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <Container>
      <Background onClick={oncloseModal} />
      <CgClose
        className="close"
        size={30}
        onClick={closeModal}
        style={{
          color: "white",
          position: "absolute",
          right: "1.5rem",
          top: "1.5rem",
          cursor: "pointer",
        }}
      />
      <ModalBlock>
        <Contents>{children}</Contents>
      </ModalBlock>
    </Container>
  );
};

Modal.defaultProps = {
  closable: true,
  maskClosable: true,
  visible: true,
};

const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 100;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Background = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(5px);
  animation: modal-bg-show 1s;
  @keyframes modal-bg-show {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const ModalBlock = styled.div`
  position: absolute;
  display: block;
  top: 6.5rem;
  border-radius: 10px;
  padding: 1.5rem;
  /* background-color: white; */
  width: 600px;
  /* @media (max-width: 1120px) {
    width: 50rem;
  }
  @media (max-width: 50rem) {
    width: 80%;
  } */
  min-height: 35rem;
  animation: modal-show 1s;
  @keyframes modal-show {
    from {
      opacity: 0;
      margin-top: -50px;
    }
    to {
      opacity: 1;
      margin-top: 0;
    }
  }
`;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default Modal;