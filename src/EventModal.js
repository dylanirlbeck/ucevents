import React from "react";
import Modal from "react-modal";
import "./EventModal.css";

const EventModal = props => {
  const { modalIsOpen, closeModal } = props;
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      contentLabel="Example Modal"
      className="EventModal">
      <div>Hello World</div>
    </Modal>
  );
};

export default EventModal;
