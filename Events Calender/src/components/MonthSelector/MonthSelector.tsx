import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import styles from "./MonthSelector.module.scss";

type MonthSelectorProps = {
  date: Date;
  updateDate: (change: number) => void;
};

const MonthSelector: React.FC<MonthSelectorProps> = ({ date, updateDate }) => {
  const displayedDate =
    date.toLocaleString("default", { month: "long" }) +
    " " +
    date.getFullYear();

  const prevMonth = () => updateDate(-1);
  const nextMonth = () => updateDate(1);

  return (
    <div className={styles.container}>
      <FontAwesomeIcon
        className={styles.container__icon}
        icon={faCaretLeft}
        onClick={prevMonth}
      />
      <h1>{displayedDate}</h1>
      <FontAwesomeIcon
        className={styles.container__icon}
        icon={faCaretRight}
        onClick={nextMonth}
      />
    </div>
  );
};

export default MonthSelector;
