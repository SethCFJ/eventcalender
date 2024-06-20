import React from "react";
import { EventCalenderData, schema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import styles from "./AddEventForm.module.scss";
import { createEventItem } from "../../services/eventcalender-services";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

interface AddEventFormProps {
  onSubmit: (data: EventCalenderData) => void;
  currentDate: string | null;
}

const AddEventForm: React.FC<AddEventFormProps> = ({
  onSubmit: parentOnSubmit,
  currentDate,
}) => {
  const { handleSubmit, register } = useForm<EventCalenderData>({
    resolver: zodResolver(schema),
    defaultValues: {
      startDate: currentDate ?? "",
      endDate: currentDate ?? "",
      name: "",
      location: "",
      label: "Work",
    },
  });
  const onSubmit = async (data: EventCalenderData) => {
    try {
      // Convert date strings to work with backend LocalDateTime typing
      const formattedData = {
        ...data,
        startDate: new Date(data.startDate).toISOString(),
        endDate: new Date(data.endDate).toISOString(),
      };

      await createEventItem(formattedData);
      parentOnSubmit(formattedData);
    } catch (error) {
      console.error("Error creating new event:", error);
    }
  };
  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.form__name}>
        <label className={styles.form__labels} htmlFor="nameInput">
          Event Name:{" "}
        </label>
        <input
          className={styles.form__fields}
          id="nameInput"
          type="text"
          {...register("name")}
          required
        />
      </div>
      <div className={styles.form__location}>
        <label className={styles.form__labels} htmlFor="locationInput">
          Location:{" "}
        </label>
        <input
          className={styles.form__fields}
          id="locationInput"
          {...register("location")}
          required
        ></input>
      </div>
      <div className={styles.form__label}>
        <label className={styles.form__labels} htmlFor="labelInput">
          Label:{" "}
        </label>
        <select
          className={styles.form__select}
          id="labelInput"
          {...register("label")}
          required
        >
          <option className={styles.form__select__work} value="Work">
            Work
          </option>
          <option className={styles.form__select__home} value="Home">
            Home
          </option>
          <option className={styles.form__select__personal} value="Personal">
            Personal
          </option>
          <option className={styles.form__select__other} value="Other">
            Other
          </option>
        </select>
      </div>
      <div className={styles.form__startDate}>
        <label className={styles.form__labels} htmlFor="startDate">
          Start Date:{" "}
        </label>
        <input
          className={styles.form__fields}
          type="date"
          id="startDate"
          {...register("startDate")}
          required
        />
      </div>
      <div className={styles.form__endDate}>
        <label className={styles.form__labels} htmlFor="endDate">
          End Date:{" "}
        </label>
        <input
          className={styles.form__fields}
          type="date"
          id="endDate"
          {...register("endDate")}
          required
        />
      </div>
      <button className={styles.form__button} type="submit">
        Create <FontAwesomeIcon icon={faPlus} />
      </button>
    </form>
  );
};

export default AddEventForm;
