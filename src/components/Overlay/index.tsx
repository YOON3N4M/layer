import useDataSync from "@/hooks/useDataSync";
import { useLayerList } from "@/state";
import { Memo } from "@/types";
import { checkObjectDiffer, cn } from "@/utils";
import { motion, useMotionValue, useMotionValueEvent } from "motion/react";
import { HTMLAttributes, ReactNode, useEffect, useState } from "react";
import OverlayTab from "./OverlayTab";

export interface OverlayProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  memo: Memo;
}

const overayVariants = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
  },
};

function Overlay(props: OverlayProps) {
  const { children, className, memo } = props;
  const { position = { x: 0, y: 0 }, parentLayerId, id, isPin } = memo;

  const [pos, setPos] = useState(position);

  const posX = useMotionValue(position.x);
  useMotionValueEvent(posX, "change", (latest) => {
    setPos((prev) => ({ ...prev, x: latest }));
  });

  const posY = useMotionValue(position.y);
  useMotionValueEvent(posY, "change", (latest) => {
    setPos((prev) => ({ ...prev, y: latest }));
  });

  const { editMemo } = useDataSync();
  const layerList = useLayerList();

  const isPositionChange = !checkObjectDiffer(pos, position);
  // 드래그 후 위치 저장
  useEffect(() => {
    if (isPositionChange) return;

    const timeoutId = setTimeout(() => {
      const newMemo = { ...memo, position: pos };
      editMemo(newMemo);
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [pos]);

  const parentLayer = layerList.find((layer) => layer.id === parentLayerId);
  const layerIndex = layerList.findIndex((layer) => layer.id === parentLayerId);
  const zIndex = 1000 - layerIndex;
  if (!parentLayer) return;

  const isHide = parentLayer.isHide;
  // const isInitPosition = pos.x === 0 && pos.y === 0;

  return (
    <motion.div
      drag
      dragMomentum={false}
      variants={overayVariants}
      initial="hidden"
      animate={isHide ? "hidden" : "show"}
      exit="hidden"
      className={cn(
        className,
        "cursor-pointer z-overlay border shadow-sm rounded-[4px] bg-white w-min min-w-[300px] pb-sm"
        // isInitPosition ? "relative" : "absolute"
      )}
      // {...bindPos()}
      style={{ y: posY, x: posX, zIndex: zIndex }}
    >
      <OverlayTab memo={memo} />
      {children}
    </motion.div>
  );
}
export default Overlay;
