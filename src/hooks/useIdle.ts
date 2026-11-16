import { useEffect, useState } from "react";

/** Becomes true once the browser is idle after mount (or after `timeout` ms). */
export function useIdle(enabled = true, timeout = 2000) {
  const [idle, setIdle] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    const start = () => setIdle(true);
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(start, { timeout });
      return () => window.cancelIdleCallback(id);
    }
    const id = setTimeout(start, 300);
    return () => clearTimeout(id);
  }, [enabled, timeout]);

  return enabled && idle;
}
