"use client";

import { rateLimitSchema } from "@/schemas/rate-limit";
import { getCookie } from "@/utils/get-cookie-client";
import { format } from "date-fns";
import { useEffect, useRef, useState } from "react";

type Props = {
  rateLimitUsed: number;
  rateLimitTotal: number;
  rateLimitReset: Date;
};

export const RateLimitInfoClient = ({
  rateLimitReset,
  rateLimitTotal,
  rateLimitUsed,
}: Props) => {
  const [used, setUsed] = useState(rateLimitUsed);
  const [total, setTotal] = useState(rateLimitTotal);
  const [reset, setReset] = useState(rateLimitReset);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      const cookie = getCookie("rateLimit");

      if (!cookie) {
        return;
      }

      try {
        const rateLimit = rateLimitSchema.safeParse(JSON.parse(cookie));
        if (rateLimit.data) {
          setUsed(rateLimit.data.rateLimitUsed);
          setTotal(rateLimit.data.rateLimitTotal);
          setReset(rateLimit.data.rateLimitReset);
        }
      } catch {
        return;
      }
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      timerRef.current = null;
    };
  }, []);

  return (
    <>
      <p>
        API Limits: {used} / {total}
      </p>
      <p>Limit reset: {format(reset, "EEEE d.MM.yyyy, HH:mm:ss")}</p>
    </>
  );
};
