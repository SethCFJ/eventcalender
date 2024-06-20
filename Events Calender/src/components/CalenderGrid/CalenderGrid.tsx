import React, { useEffect, useState } from "react";
import styles from "./CalenderGrid.module.scss";
import DayTile from "../DayTile/DayTile";
import DayModal from "../DayModal/DayModal";

import { EventCalenderData } from "../AddEventForm/schema";
import ViewEventModal from "../ViewEventModal/ViewEventModal";
import { EventItemResponse } from "../../services/api-response.interface";
import { getAllEvents } from "../../services/eventcalender-services";

type CalenderGridProps = {
  date: Date;
};

const CalenderGrid: React.FC<CalenderGridProps> = ({ date }) => {
  //State for AddEventModal
  const [modal, setModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [events, setEvents] = useState<EventCalenderData[]>([]);

  //State for View Event Modal
  const [viewEventModal, setViewEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventItemResponse | null>(
    null
  );
  // Get all date values needed for logic
  const today = new Date().toISOString().split("T")[0];
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  let startDay = firstDay.getDay();
  startDay = (startDay + 5) % 7;
  const days: string[] = [];

  // Add empty tiles for the days before the first day of the month
  for (let i = 0; i < startDay; i++) {
    days.push("");
  }

  // Normalize the dates to YYYY-MM-DD format
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(new Date(year, month, i).toISOString().split("T")[0]);
  }
  // Modal states
  const openDayModal = (date: string) => {
    setSelectedDate(date);
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
    setSelectedDate(null);
  };

  const openViewEventModal = (event: EventItemResponse) => {
    setSelectedEvent(event);
    setViewEventModal(true);
  };

  const closeViewEventModal = () => {
    setViewEventModal(false);
    setSelectedEvent(null);
  };
  const refreshEvents = async () => {
    try {
      const eventsData = await getAllEvents();
      setEvents(eventsData);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };
  // Refresh calender when modal states change
  useEffect(() => {
    refreshEvents();
  }, [modal, viewEventModal]);

  const addEvent = (event: EventCalenderData) => {
    setEvents((prevEvents) => [...prevEvents, event]);
    setModal(false);
    refreshEvents();
    closeModal();
  };
  return (
    <div>
      <div className={styles.days}>
        <h2 className={styles.days__text}>Monday</h2>
        <h2 className={styles.days__text}>Tuesday</h2>
        <h2 className={styles.days__text}>Wednesday</h2>
        <h2 className={styles.days__text}>Thursday</h2>
        <h2 className={styles.days__text}>Friday</h2>
        <h2 className={styles.days__text}>Saturday</h2>
        <h2 className={styles.days__text}>Sunday</h2>
      </div>
      {modal && (
        <DayModal
          openModal={modal}
          closeModal={closeModal}
          setModal={setModal}
          date={selectedDate}
          onSubmit={addEvent}
        />
      )}
      {viewEventModal && (
        <ViewEventModal
          openModal={viewEventModal}
          closeModal={closeViewEventModal}
          event={selectedEvent}
          refreshEvents={refreshEvents}
        />
      )}
      <div className={styles.grid}>
        {days.map((day, index) => (
          <DayTile
            key={index}
            day={day}
            events={events.filter(
              (event) => event.startDate.split("T")[0] === day
            )}
            onClick={() => day && openDayModal(day)}
            isCurrentDay={day === today}
            openViewEventModal={openViewEventModal}
          />
        ))}
      </div>
    </div>
  );
};

export default CalenderGrid;
