import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please add your full name.").max(100),
  email: z.string().trim().email("Please add a valid email address.").max(200),
  subject: z.string().trim().min(3, "Please add a subject.").max(150),
  message: z.string().trim().min(10, "Please add at least 10 characters.").max(4000),
  budget: z.string().trim().max(100).optional().or(z.literal("")),
  service: z.string().trim().max(100).optional().or(z.literal("")),
  website: z.string().max(200).optional().or(z.literal(""))
});

export type ContactInput = z.infer<typeof contactSchema>;
