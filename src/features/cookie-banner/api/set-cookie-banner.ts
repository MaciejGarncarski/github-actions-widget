"use server";

import { cookieConfig } from "@/constants/cookie";
import { cookies } from "next/headers";

export const setCookieAccepted = async () => {
  const cookiesObj = await cookies();
  cookiesObj.set("cookiesAccepted", "true", cookieConfig);
};
