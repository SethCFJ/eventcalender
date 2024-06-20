import { EventCalenderData } from "../components/AddEventForm/schema";
import { EventItemResponse } from "./api-response.interface";

const baseUrl = import.meta.env.VITE_APP_BACKEND_BASE_URL;

export const getAllEvents = async (): Promise<EventItemResponse[]> => {
  const response = await fetch(baseUrl + "/calender/events");
  if (!response.ok) {
    throw new Error("Failed to fetch");
  }
  const data = await response.json();
  return data;
};

export const getEventById = async (id: number): Promise<EventItemResponse> => {
  const response = await fetch(`${baseUrl}/calender/events/${id}`);
  if (!response.ok) {
    console.log(response.status);
    throw new Error("Failed to fetch event");
  }
  return await response.json();
};

export const createEventItem = async (
  data: EventCalenderData
): Promise<EventItemResponse> => {
  const response = await fetch(baseUrl + "/calender/events", {
    method: "POST",
    body: JSON.stringify({ ...data, completed: false }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    console.log(response.status);
    throw new Error("Error creating new event");
  }
  return await response.json();
};

export const updateEventItem = async (
  id: number,
  data: EventCalenderData
): Promise<EventItemResponse> => {
  const response = await fetch(`${baseUrl}/calender/events/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    console.log(response.status);
    throw new Error("Error updating event");
  }
  return await response.json();
};

export const deleteEventItem = async (id: number) => {
  const response = await fetch(`${baseUrl}/calender/events/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    console.log(response.status);
    throw new Error("Error deleting event");
  }
  return;
};
