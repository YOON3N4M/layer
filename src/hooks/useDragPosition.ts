import { MemoPosition } from "@/types";
import { useMotionValue, useMotionValueEvent } from "motion/react";
import { useState } from "react";

/**
 * motion의 Drag옵션을 사용하는 경우 포지션 값을 편리하게 관리하기 위한 훅
 */
function useDragPosition(initialPosition: MemoPosition = { x: 0, y: 0 }) {
  const [pos, setPos] = useState(initialPosition);

  const motionX = useMotionValue(initialPosition.x);
  useMotionValueEvent(motionX, "change", (latest) => {
    setPos((prev) => ({ ...prev, x: latest }));
  });

  const motionY = useMotionValue(initialPosition.y);
  useMotionValueEvent(motionY, "change", (latest) => {
    setPos((prev) => ({ ...prev, y: latest }));
  });

  return { pos, motionX, motionY };
}

export default useDragPosition;
