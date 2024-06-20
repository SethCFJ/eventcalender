import React from "react";
import { useForm } from "react-hook-form";
import { EventItemResponse } from "../../services/api-response.interface";
import styles from "./UpdateEventForm.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
interface UpdateEventFormProps {
  event: EventItemResponse;
  onSubmit: (data: EventItemResponse) => Promise<void>;
  onCancel: () => void;
}

const UpdateEventForm: React.FC<UpdateEventFormProps> = ({
  event,
  onSubmit,
  onCancel,
}) => {
  const { handleSubmit, register } = useForm<EventItemResponse>({
    defaultValues: event,
  });

  const handleFormSubmit = async (data: EventItemResponse) => {
    await onSubmit(data);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(handleFormSubmit)}>
      <label className={styles.form__labels}>Name</label>
      <input
        className={styles.form__fields}
        type="text"
        {...register("name")}
      />
      <label className={styles.form__labels}>Label</label>
      <select className={styles.form__select} {...register("label")}>
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
      <label className={styles.form__labels}>Location</label>
      <input
        className={styles.form__fields}
        type="text"
        {...register("location")}
      />
      <label className={styles.form__labels}>Start Date</label>
      <input
        className={styles.form__fields}
        type="date"
        {...register("startDate")}
      />
      <label className={styles.form__labels}>End Date</label>
      <input
        className={styles.form__fields}
        type="date"
        {...register("endDate")}
      />
      <div>
        <button className={styles.form__buttons__submit} type="submit">
          Save <FontAwesomeIcon icon={faFloppyDisk} />
        </button>
        <button
          className={styles.form__buttons__cancel}
          type="button"
          onClick={onCancel}
        >
          Cancel
          <FontAwesomeIcon icon={faBan} />
        </button>
      </div>
    </form>
  );
};

export default UpdateEventForm;
