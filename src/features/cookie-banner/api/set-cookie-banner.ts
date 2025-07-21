"use server";

import { cookies } from "next/headers";

export const setCookieAccepted = async () => {
  const cookiesObj = await cookies();
  cookiesObj.set("cookiesAccepted", "true");
};
