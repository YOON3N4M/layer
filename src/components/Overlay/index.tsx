import { cn } from "@/utils";
import { motion } from "motion/react";
import { HTMLAttributes, ReactNode, useState } from "react";
import { useDrag } from "react-use-gesture";

export interface OverlayProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  x?: number;
  y?: number;
  hidden?: boolean;
}
/**
 * 드래그가 가능한 overlay 컨텐츠들에
 *
 * 활용 가능한 템플릿 컴포넌트
 */

const overayVariants = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
  },
};

function Overlay(props: OverlayProps) {
  const { children, className, x = 0, y = 0, hidden } = props;
  const [pos, setPos] = useState({ x: x, y: y });
  const bindPos = useDrag((params) => {
    setPos({
      x: params.offset[0],
      y: params.offset[1],
    });
  });

  console.log(pos);
  return (
    <motion.div
      variants={overayVariants}
      initial="hidden"
      animate={hidden ? "hidden" : "show"}
      exit="hidden"
      className={cn(
        className,
        "relative cursor-pointer z-overlay border shadow-sm rounded-[4px] bg-white w-min min-w-[300px]"
      )}
      {...bindPos()}
      style={{ top: pos.y, left: pos.x }}
    >
      {children}
    </motion.div>
  );
}
export default Overlay;
