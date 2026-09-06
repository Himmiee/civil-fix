import * as z from "zod";

export const reportIssueSchema = z.object({
  photoUrl: z.string().optional(),
  locationStr: z.string().min(1, "Location is required"),
  category: z.string().min(1, "Category is required"),
  otherCategory: z.string().optional(),
  description: z.string().min(10, "Description must be at least 10 characters"),
});

export type ReportIssueFormValues = z.infer<typeof reportIssueSchema>;
