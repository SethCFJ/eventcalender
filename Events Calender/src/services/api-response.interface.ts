export interface EventItemResponse {
  id: number;
  name: string;
  label: "Work" | "Home" | "Personal" | "Other";
  location: string;
  startDate: string;
  endDate: string;
}
