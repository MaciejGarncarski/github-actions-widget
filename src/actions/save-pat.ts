"use server";
import * as z from "zod";

import { setPATCookie } from "@/utils/cookie";

const PATSchema = z.object({
  PAT: z
    .string()
    .regex(
      /^(ghp|github_pat)_[A-Za-z0-9_]{20,}$/,
      "Nieprawidłowy format GitHub PAT"
    ),
});

export async function savePAT(prevState: string, formData: FormData) {
  try {
    const parsed = PATSchema.safeParse(Object.fromEntries(formData));

    if (parsed.error) {
      return "invalid-token";
    }

    await setPATCookie(parsed.data.PAT);

    return "success";
  } catch {
    return "error";
  }
}
