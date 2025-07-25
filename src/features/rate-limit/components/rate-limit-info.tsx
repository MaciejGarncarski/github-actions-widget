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
  const { data } = useGetActions({ token, owner, repo });

  const used =
    data.pages[data.pages.length - 1]?.rate_limit?.rateLimitUsed || 0;
  const total =
    data.pages[data.pages.length - 1]?.rate_limit?.rateLimitTotal || 5000;
  const reset =
    data.pages[data.pages.length - 1]?.rate_limit?.rateLimitReset || new Date();

  return (
    <div className="mx-auto text-lg backdrop-blur-2xl text-center w-full px-6 py-3 rounded-lg shadow border bg-black/30  border-white/20">
      <p>
        API Limits: {used} / {total}
      </p>
      <p>Limit reset: {format(reset, "EEEE d.MM.yyyy, HH:mm:ss")}</p>
    </div>
  );
};
