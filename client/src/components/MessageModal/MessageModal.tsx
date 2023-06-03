import React, { useEffect, useState } from "react";
import "./MessageModal.scss";
type ModalProps = {
  isSucces: boolean | undefined;
  message: string;
  showModal: boolean | undefined;
  setShowModal: React.Dispatch<React.SetStateAction<boolean | undefined>>;
};

const MessageModal: React.FC<ModalProps> = ({
  isSucces,
  message,
  showModal,
  setShowModal,
}) => {
  useEffect(() => {
    if (setShowModal !== undefined) {
      
      const timer = setTimeout(() => {
        setShowModal(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [showModal]);

  const modalClass = isSucces ? "success" : "error";

  return (
    <div className={`modal ${showModal ? "show" : ""}`}>
      <div className={`modal-content ${modalClass}`}>
        <span className="close">&times;</span>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default MessageModal;
