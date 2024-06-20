import React from "react";
import styles from "./DayTile.module.scss";
import { EventCalenderData } from "../AddEventForm/schema";
import EventCard from "../EventCard/EventCard";
import { EventItemResponse } from "../../services/api-response.interface";

type DayTileProps = {
  day: string;
  events: EventCalenderData[];
  onClick: () => void;
  isCurrentDay?: boolean;
  openViewEventModal: (event: EventItemResponse) => void;
};

const DayTile: React.FC<DayTileProps> = ({
  day,
  onClick,
  isCurrentDay,
  events,
  openViewEventModal,
}) => {
  return (
    <div
      className={`${styles.tile} ${
        isCurrentDay ? styles.tile__currentDay : ""
      }`}
      onClick={onClick}
    >
      {day ? (
        <h1 className={styles.dateText}>{new Date(day).getDate()}</h1>
      ) : null}
      <div className={styles.events}>
        {day &&
          events.map((event, index) => (
            <EventCard
              key={index}
              event={event}
              onClick={(e) => {
                e.stopPropagation();
                openViewEventModal(event as EventItemResponse);
              }}
            />
          ))}
      </div>
    </div>
  );
};

export default DayTile;
