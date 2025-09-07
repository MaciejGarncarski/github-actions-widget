"use server";
import * as z from "zod";

import { setConfig } from "@/utils/cookie";
import { redirect } from "next/navigation";

const PATSchema = z.object({
  PAT: z
    .string()
    .regex(
      /^(ghp|github_pat)_[A-Za-z0-9_]{20,}$/,
      "Nieprawidłowy format GitHub PAT"
    ),
});

export async function savePAT(prevState: string, formData: FormData) {
  const parsed = PATSchema.safeParse(Object.fromEntries(formData));

  if (parsed.error) {
    return "invalid-token";
  }

  await setConfig({
    PAT: parsed.data.PAT,
  });

  throw redirect("/");
}
