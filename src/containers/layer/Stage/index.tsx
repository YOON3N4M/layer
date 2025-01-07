import { motionValue } from "motion";
import { motion } from "motion/react";
import {
  KeyboardEvent,
  ReactNode,
  RefObject,
  WheelEvent,
  useRef,
  useState,
} from "react";

interface StageProps {
  children: ReactNode;
  stageRef: RefObject<HTMLDivElement>;
}

const TARGET_KEYBOARD = "Meta";

function Stage(props: StageProps) {
  const { children, stageRef } = props;

  const [scale, setScale] = useState(1);
  const [isKeydown, setIsKeydown] = useState(false);

  const containerRef = useRef(null);

  function handleKeydown(event: KeyboardEvent<HTMLDivElement>) {
    const isTargetKeydown = event.key === TARGET_KEYBOARD;
    if (isTargetKeydown) {
      setIsKeydown(true);
    }
  }

  function handleKeyup(event: KeyboardEvent<HTMLDivElement>) {
    const isTargetKeydown = event.key === TARGET_KEYBOARD;
    if (isTargetKeydown) {
      setIsKeydown(false);
    }
  }

  function handleWheel(event: WheelEvent<HTMLDivElement>) {
    if (!isKeydown) return;

    if (event.deltaY < 0) {
      setScale((prev) => prev + 0.05);
    } else if (event.deltaY > 0) {
      setScale((prev) => prev - 0.05);
    }
  }

  return (
    <motion.div
      className="overflow-hidden outline-none"
      tabIndex={0}
      ref={containerRef}
      onWheel={handleWheel}
      onKeyDown={handleKeydown}
      onKeyUp={handleKeyup}
    >
      <motion.div
        ref={stageRef}
        drag={isKeydown ? true : false}
        dragMomentum={false}
        className="relative size-[4000px] bg-bodyBg"
        style={{ scale }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

export default Stage;
