import { useState, useEffect, useRef, useCallback } from 'react';

const DEFAULT_TIME = 30; // seconds

export function useTimer({ enabled, onTimeout, paused }) {
  const [timeLeft, setTimeLeft] = useState(DEFAULT_TIME);
  const intervalRef = useRef(null);
  const onTimeoutRef = useRef(onTimeout);
  onTimeoutRef.current = onTimeout;

  const reset = useCallback(() => {
    setTimeLeft(DEFAULT_TIME);
  }, []);

  useEffect(() => {
    if (!enabled || paused) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    intervalRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
          onTimeoutRef.current?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [enabled, paused]);

  const percent = (timeLeft / DEFAULT_TIME) * 100;
  const color = timeLeft > 15 ? 'var(--green)' : timeLeft > 5 ? 'var(--gold)' : 'var(--red)';
  const urgent = timeLeft <= 5 && timeLeft > 0;

  return { timeLeft, percent, color, urgent, reset, DEFAULT_TIME };
}
