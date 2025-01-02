import { useEffect, useRef } from "react";

function useClickOutside(callback: () => void) {
  const ref = useRef<HTMLDivElement | HTMLInputElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback]);

  return ref;
}

export default useClickOutside;
