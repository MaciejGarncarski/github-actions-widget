"use server";

import { cookieConfig } from "@/constants/cookie";
import { cookies } from "next/headers";

export const setSelectedRepo = async (value: string) => {
  const appCookies = await cookies();

  appCookies.set("selectedRepo", value, cookieConfig);
};

export const getRepo = async () => {
  const appCookies = await cookies();
  const repo = appCookies.get("selectedRepo");

  return repo?.value;
};
