"use server";

import { cookies } from "next/headers";

export const setSelectedRepo = async (value: string) => {
  const appCookies = await cookies();

  appCookies.set("selectedRepo", value, {
    httpOnly: true,
    sameSite: "strict",
    secure: true,
  });
};

export const getRepo = async () => {
  const appCookies = await cookies();
  const repo = appCookies.get("selectedRepo");

  return repo?.value;
};
