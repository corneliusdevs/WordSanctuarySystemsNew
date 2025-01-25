import { useState, useEffect } from "react";

interface MediaQueryListEvent extends Event {
  readonly matches: boolean;
  readonly media: string;
}

export function useMediaQuery(query: string) {
  const [value, setValue] = useState(false);

  useEffect(() => {
    function onChange(event: MediaQueryListEvent) {
      setValue(event.matches);
    }
    const result = window.matchMedia(query);
    result.addEventListener("change", onChange);
    setValue(result.matches);
    return () => result.removeEventListener("change", onChange);
  }, [query]);

  return value;
}
