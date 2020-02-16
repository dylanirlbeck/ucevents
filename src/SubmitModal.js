import React from "react";
import Modal from "react-modal";
import "./EventModal.css";
import "./DatePicker.css";
const SubmitModal = props => {
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
      className="relative z-10 flex items-center justify-center bg-red-200"
      overlayClassName="EventModlOverlay">
      <div className="flex flex-col px-8 pt-6 pb-8 my-2 mb-4 bg-white rounded shadow-md">
        <div className="mb-6 -mx-3 md:flex">
          <div className="px-3 mb-6 md:w-1/2 md:mb-0">
            <label className="block mb-2 text-xs font-bold tracking-wide uppercase text-grey-darker">
              Event Name
            </label>
            <input
              className="block w-full px-4 py-3 mb-3 border rounded appearance-none bg-grey-lighter text-grey-darker border-red"
              type="text"
              placeholder="Movie Screening"></input>
            <p className="text-xs italic text-red">
              Please fill out this field.
            </p>
          </div>
          <div className="px-3 md:w-1/2">
            <label className="block mb-2 text-xs font-bold tracking-wide uppercase text-grey-darker">
              Date
            </label>
            <div>
              <input type="date" name="date" id="date" />
            </div>
          </div>
        </div>
        <div className="mb-6 -mx-3 md:flex">
          <div className="px-3 md:w-full">
            <label className="block mb-2 text-xs font-bold tracking-wide uppercase text-grey-darker">
              Email
            </label>
            <input
              className="block w-full px-4 py-3 mb-3 border rounded appearance-none bg-grey-lighter text-grey-darker border-grey-lighter"
              type="email"
              placeholder="janedoe@uchicago.edu"></input>
            <p className="text-xs italic text-grey-dark">
              We'll send you a reminder for the event.
            </p>
          </div>
        </div>
        <div className="flex flex-row mb-6 md:w-full">
          <div className="flex w-1/2 px-3">
            <button
              className="block w-full px-4 py-3 mb-3 border rounded appearance-none bg-grey-lighter text-grey-darker border-red"
              onClick={closeModal}>
              Cancel
            </button>
          </div>
          <div className="flex w-1/2 px-3">
            <button
              className="block w-full px-4 py-3 mb-3 border rounded appearance-none bg-grey-lighter text-grey-darker border-red"
              onClick={closeModal}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
export default SubmitModal;
