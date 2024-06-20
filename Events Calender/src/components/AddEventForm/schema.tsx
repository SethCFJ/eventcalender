import * as z from "zod";

export const schema = z
  .object({
    name: z.string().min(1, "Event name is required"),
    label: z.enum(["Work", "Home", "Personal", "Other"]),
    location: z.string().min(1, "Location is required"),
    startDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
      message: "Invalid start date",
    }),
    endDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
      message: "Invalid end date",
    }),
  })
  .superRefine((data, ctx) => {
    // checks to see if end date is before start date
    if (new Date(data.endDate) < new Date(data.startDate)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "End date must be after start date",
        path: ["endDate"],
      });
    }
  });

export type EventCalenderData = z.infer<typeof schema>;
