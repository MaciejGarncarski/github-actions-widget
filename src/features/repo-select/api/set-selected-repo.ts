"use server";

import { setConfig } from "@/utils/cookie";

export const setSelectedRepo = async (value: string) => {
  await setConfig({
    selectedRepo: value,
  });
};
