// hooks/useAutoSlider.ts
import { useCallback, useEffect, useRef, useState } from "react";

export function useAutoSlider(length: number, delay: number) {
  const [index, setIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startInterval = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % length);
    }, delay);
  }, [length, delay]);

  useEffect(() => {
    if (length > 0) startInterval();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [length, delay, startInterval]);

  const handleClick = (i: number) => {
    setIndex(i);
    startInterval();
  };

  return { index, setIndex: handleClick };
}
