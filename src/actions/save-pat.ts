"use server";
import * as z from "zod";

import { setPATCookie } from "@/utils/cookie";

const PATSchema = z.object({
  PAT: z.string().min(10),
});

export async function savePAT(prevState: string, formData: FormData) {
  try {
    const parsed = PATSchema.safeParse(Object.fromEntries(formData));

    if (parsed.error) {
      return "Invalid token provided";
    }

    await setPATCookie(parsed.data.PAT);

    return "success";
  } catch {
    return "Unexpected error";
  }
}
