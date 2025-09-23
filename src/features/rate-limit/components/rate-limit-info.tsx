"use client";

import { useGetActions } from "@/features/actions-list/api/get-actions";
import { format } from "date-fns";

export const RateLimitInfo = ({
  token,
  owner,
  repo,
}: {
  token: string;
  owner: string;
  repo: string;
}) => {
  const { data, isError } = useGetActions({ token, owner, repo });

  if (isError || data.pages.filter(Boolean).length < 1) {
    return null;
  }

  const used =
    data.pages[data.pages.length - 1]?.rate_limit?.rateLimitUsed || 0;
  const total =
    data.pages[data.pages.length - 1]?.rate_limit?.rateLimitTotal || 5000;
  const reset =
    data.pages[data.pages.length - 1]?.rate_limit?.rateLimitReset || new Date();

  return (
    <div className="mx-auto text-lg backdrop-blur-2xl text-center w-full px-6 py-3 rounded-lg shadow border bg-slate-300/10  border-white/20">
      <p>
        API Limits: {used} / {total}
      </p>
      <p>Limit reset: {format(reset, "EEEE d.MM.yyyy, HH:mm:ss")}</p>
    </div>
  );
};
