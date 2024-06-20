import React, { useEffect, useRef } from "react";
import styles from "./DayModal.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import AddEventForm from "../AddEventForm/AddEventForm";
import { EventCalenderData } from "../AddEventForm/schema";
interface DayModalProps {
  openModal: boolean;
  closeModal: () => void;
  setModal: (modal: boolean) => void;
  date: string | null;
  onSubmit: (data: EventCalenderData) => void;
}

const DayModal: React.FC<DayModalProps> = ({
  openModal,
  closeModal,
  setModal,
  date,
  onSubmit,
}) => {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (openModal) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [openModal, setModal, closeModal]);
  const handleSubmit = (data: EventCalenderData) => {
    onSubmit(data);
    setModal(false);
  };
  return (
    <dialog className={styles.modal} ref={ref} onCancel={closeModal}>
      <div className={styles.container}>
        <button
          className={styles.button}
          onClick={() => {
            console.log("close button pressed");
            console.log(openModal);
            setModal(false);
          }}
        >
          <FontAwesomeIcon icon={faX} />
        </button>
      </div>
      {date && <h2>{`${new Date(date).toDateString()}`}</h2>}
      <AddEventForm onSubmit={handleSubmit} currentDate={date ?? ""} />
    </dialog>
  );
};

export default DayModal;
