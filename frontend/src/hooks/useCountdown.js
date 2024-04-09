import { useEffect, useState } from "react";

export const useCountdown = () => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (seconds <= 0) {
      return;
    }

    const timeout = setTimeout(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [seconds]);

  return { seconds, setSeconds };
};
