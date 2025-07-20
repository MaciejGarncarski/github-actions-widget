"use server";
import * as z from "zod";

import { cookies } from "next/headers";

const PATSchema = z.object({
  PAT: z.string().min(10),
});

export async function savePAT(prevState: string, formData: FormData) {
  "use server";

  try {
    const parsed = PATSchema.safeParse(Object.fromEntries(formData));

    if (parsed.error) {
      return "Invalid token provided";
    }

    const appCookies = await cookies();

    appCookies.set("PAT", parsed.data.PAT, {
      httpOnly: true,
      sameSite: "strict",
    });

    return "success";
  } catch {
    return "Unexpected error";
  }
}
