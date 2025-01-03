import { useLayerList } from "@/state";
import { Memo } from "@/types";
import { cn } from "@/utils";
import { motion } from "motion/react";
import { HTMLAttributes, ReactNode, useState } from "react";
import { useDrag } from "react-use-gesture";
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
  const { position = { x: 0, y: 0 }, parentLayerId, id } = memo;

  const [pos, setPos] = useState(position);
  const bindPos = useDrag((params) => {
    setPos({
      x: params.offset[0],
      y: params.offset[1],
    });
  });
  const layerList = useLayerList();

  const parentLayer = layerList.find((layer) => layer.id === parentLayerId);
  if (!parentLayer) return;

  const isHide = parentLayer.isHide;

  console.log(pos);
  return (
    <motion.div
      variants={overayVariants}
      initial="hidden"
      animate={isHide ? "hidden" : "show"}
      exit="hidden"
      className={cn(
        className,
        "absolute cursor-pointer z-overlay border shadow-sm rounded-[4px] bg-white w-min min-w-[300px] pb-sm"
      )}
      {...bindPos()}
      style={{ top: pos.y, left: pos.x }}
    >
      <OverlayTab memoId={id} pos={pos} />
      {children}
    </motion.div>
  );
}
export default Overlay;
