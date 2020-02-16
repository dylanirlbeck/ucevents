import React from "react";
import Modal from "react-modal";
import "./EventModal.css";

const EventModal = props => {
  const { modalIsOpen, closeModal } = props;
  return (
    <Modal
      isOpen={modalIsOpen}
      style={{
        overlay: {},
        content: {
          position: "absolute",
          top: "0px",
          left: "0px",
          right: "0px",
          bottom: "0px",
          border: "none",
          overflow: "auto",
          WebkitOverflowScrolling: "touch",
          outline: "none",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
        },
      }}
      onRequestClose={closeModal}
      className="relative z-10 flex items-center justify-center bg-red-200">
      overlayClassName="EventModalOverlay"
      <div className="flex flex-grow w-full overflow-hidden EventModalContainer">
        <div className="w-full h-full">
          <div className="h-full" />
          <div className="sticky bottom-0 z-10 flex flex-row justify-center w-full p-4 border rounded text-md">
            <button
              className="flex w-20 px-5 py-1 text-white bg-red-800 border border-red-800 rounded l-0 hover:bg-red-900"
              onClick={closeModal}>
              Cancel
            </button>
            <button
              className="flex w-20 px-3 px-5 py-1 text-red-900 border border-red-800 rounded r-0 hover:bg-red-200"
              onClick={closeModal}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default EventModal;
