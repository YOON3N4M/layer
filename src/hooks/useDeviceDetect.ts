import { DebounceEvent } from "@/utils/DebounceEvent";
import { useEffect, useState } from "react";

export interface DeviceDetect {
  [key: string]: boolean | undefined;
  isPc: boolean | undefined;
  isTab: boolean | undefined;
  isMobile: boolean | undefined;
}

interface UseDeviceDetect extends DeviceDetect {}

/* 프로젝트 성격에 맞게 수정 필요 */
const mo = 734;
const tab = 1199;
const pc = 1200;

function useDeviceDetect(): UseDeviceDetect {
  const [deviceDetect, setDeviceDetect] = useState<DeviceDetect>({
    isPc: undefined,
    isTab: undefined,
    isMobile: undefined,
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      setDeviceDetect((prev) => {
        const newState: DeviceDetect = {
          isPc: width >= pc,
          isTab: width > 734 && width < pc,
          isMobile: width <= mo,
        };
        const isDeviceChanged = Object.keys(prev).find(
          (key) => prev[key] !== newState[key]
        );
        return isDeviceChanged ? newState : prev;
      });
    };

    handleResize();
    const ResizeDebounced = new DebounceEvent("resize", handleResize);

    return () => {
      ResizeDebounced.removeEventListeners();
    };
  }, []);

  return deviceDetect;
}

export default useDeviceDetect;
