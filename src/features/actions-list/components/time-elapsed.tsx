"use client";

import { formatDuration, intervalToDuration } from "date-fns";
import { useEffect, useRef, useState } from "react";

type Props = {
  initialDate: Date;
};

export const TimeElapsed = ({ initialDate }: Props) => {
  const [date, setDate] = useState(new Date());
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      timerRef.current = null;
    };
  }, []);

  const timeElapsed = formatDuration(
    intervalToDuration({
      start: initialDate,
      end: date,
    })
  );

  return <p>{timeElapsed}</p>;
};
