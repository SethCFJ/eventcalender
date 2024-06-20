import React, { useState, useEffect, useRef } from "react";
import styles from "./ViewEventModal.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash, faX } from "@fortawesome/free-solid-svg-icons";
import { EventItemResponse } from "../../services/api-response.interface";
import {
  updateEventItem,
  deleteEventItem,
} from "../../services/eventcalender-services";
import UpdateEventForm from "../UpdateEventForm/UpdateEventForm";

interface ViewEventModalProps {
  openModal: boolean;
  closeModal: () => void;
  event: EventItemResponse | null;
  refreshEvents: () => void;
}
const countdown = (endDate: string): number => {
  const end = new Date(endDate);
  const today = new Date();

  // Set time to 00:00:00 to avoid issues with partial days
  end.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  const difference = end.getTime() - today.getTime();
  const daysLeft = Math.ceil(difference / (1000 * 60 * 60 * 24));
  return daysLeft;
};

const ViewEventModal: React.FC<ViewEventModalProps> = ({
  openModal,
  closeModal,
  event,
  refreshEvents,
}) => {
  if (!event) {
    return null;
  }
  const ref = useRef<HTMLDialogElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  //Handle modal state
  useEffect(() => {
    if (openModal) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [openModal]);

  const handleUpdate = async (data: EventItemResponse) => {
    await updateEventItem(event.id, data);
    refreshEvents();
    setIsEditing(false);
    closeModal();
  };

  const handleDelete = async () => {
    await deleteEventItem(event.id);
    refreshEvents();
    closeModal();
  };
  const daysLeft = countdown(event.endDate);

  return (
    <dialog className={styles.modal} ref={ref} onCancel={closeModal}>
      <div className={styles.container}>
        <button
          className={styles.button}
          onClick={() => {
            setIsEditing(false);
            closeModal();
          }}
        >
          <FontAwesomeIcon icon={faX} />
        </button>
      </div>
      {isEditing ? (
        <UpdateEventForm
          event={event}
          onSubmit={handleUpdate}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <>
          <h2>{event.name}</h2>
          <div className={styles.event__values}>
            <h3>Location: </h3>
            <p>{event.location}</p>
          </div>
          <div className={styles.event__values}>
            <h3>Label: </h3>
            <p>{event.label}</p>
          </div>
          <div className={styles.event__values}>
            <h3>Start Date:</h3>
            <p>{new Date(event.startDate).toLocaleDateString()}</p>
          </div>
          <div className={styles.event__values}>
            <h3>End Date:</h3>
            <p>{new Date(event.endDate).toLocaleDateString()}</p>
          </div>
          <div className={styles.event__values}>
            <h3>Days left:</h3>
            <p>{daysLeft >= 0 ? `${daysLeft}` : "This event has ended"}</p>
          </div>
          <button
            className={styles.form__button}
            onClick={() => setIsEditing(true)}
          >
            Edit <FontAwesomeIcon icon={faPenToSquare} />
          </button>
          <button className={styles.form__button} onClick={handleDelete}>
            Delete <FontAwesomeIcon icon={faTrash} />
          </button>
        </>
      )}
    </dialog>
  );
};

export default ViewEventModal;
