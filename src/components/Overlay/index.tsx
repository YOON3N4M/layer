import { useLayerList } from "@/state";
import { Memo } from "@/types";
import { cn } from "@/utils";
import { motion } from "motion/react";
import { HTMLAttributes, ReactNode, useEffect, useState } from "react";
import { useDrag } from "react-use-gesture";
import OverlayTab from "./OverlayTab";
import useDataSync from "@/hooks/useDataSync";

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
  const { position = { x: 0, y: 0 }, parentLayerId, id } = memo;

  const [pos, setPos] = useState(position);
  const bindPos = useDrag((params) => {
    setPos({
      x: params.offset[0],
      y: params.offset[1],
    });
  });
  const { editMemo } = useDataSync();
  const layerList = useLayerList();

  // 드래그 후 위치 저장
  useEffect(() => {
    // 디바운스 효과: 1초 후에 저장
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
  const isInitPosition = pos.x === 0 && pos.y === 0;

  console.log(pos);
  return (
    <motion.div
      variants={overayVariants}
      initial="hidden"
      animate={isHide ? "hidden" : "show"}
      exit="hidden"
      className={cn(
        className,
        "cursor-pointer z-overlay border shadow-sm rounded-[4px] bg-white w-min min-w-[300px] pb-sm",
        isInitPosition ? "relative" : "absolute"
      )}
      {...bindPos()}
      style={{ top: pos.y, left: pos.x, zIndex: zIndex }}
    >
      <OverlayTab memoId={id} pos={pos} />
      {children}
    </motion.div>
  );
}
export default Overlay;
