import React from "react";
import styles from "./EventCard.module.scss";
import { EventCalenderData } from "../AddEventForm/schema";

interface EventCardProps {
  event: EventCalenderData;
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}
const EventCard: React.FC<EventCardProps> = ({ event, onClick }) => {
  const getLabelColor = (label: string) => {
    switch (label) {
      case "Work":
        return styles.card__work;
      case "Home":
        return styles.card__home;
      case "Personal":
        return styles.card__personal;
      case "Other":
        return styles.card__other;
      default:
        return "";
    }
  };
  return (
    <div
      className={`${styles.card} ${getLabelColor(event.label)}`}
      onClick={onClick}
    >
      <h2 className={styles.card__text}>{event.name}</h2>
      <p className={styles.card__text}>{event.label}</p>
    </div>
  );
};

export default EventCard;
