import React, { useState } from "react";
import Modal from "react-modal";

function MyModal() {
  const [modalOpen, setModalOpen] = useState(false);

  const ModalStyle = {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  return (
    <div>
      <button
        onClick={() => {
          setModalOpen(true);
        }}
      >
        열려라 참깨
      </button>
      <Modal
        style={ModalStyle}
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
      >
        이것은 모달컨텐츠입니다
        <button
          onClick={() => {
            setModalOpen(false);
          }}
        >
          닫혀라 들깨
        </button>
      </Modal>
    </div>
  );
}

export default MyModal;
