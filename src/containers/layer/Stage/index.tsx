import { motionValue } from "motion";
import { motion } from "motion/react";
import {
  KeyboardEvent,
  ReactNode,
  RefObject,
  WheelEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { useLayerContainerActions, useScale, useStagePosition } from "../state";
import useDragPosition from "@/hooks/useDragPosition";
import { cn } from "@/utils";

interface StageProps {
  children: ReactNode;
  stageRef: RefObject<HTMLDivElement>;
}

const unit = 0.05;
const maxScale = 1.5;
const minScale = 0.1;

const ZOOM_TARGET_KEYBOARD = "Meta";
const DRAG_TARGET_KEYBOARD = " ";

function Stage(props: StageProps) {
  const { children, stageRef } = props;

  const [isKeydown, setIsKeydown] = useState(false);
  const containerRef = useRef(null);

  const scale = useScale();
  const stagePosition = useStagePosition();
  const { setScale, setStagePosition } = useLayerContainerActions();
  const { motionX, motionY } = useDragPosition();

  function handleKeydown(event: KeyboardEvent<HTMLDivElement>) {
    const isTargetKeydown =
      event.key === ZOOM_TARGET_KEYBOARD || event.key === DRAG_TARGET_KEYBOARD;

    if (isTargetKeydown) {
      // event.preventDefault();
      setIsKeydown(true);
    }
  }

  function handleKeyup(event: KeyboardEvent<HTMLDivElement>) {
    const isTargetKeydown =
      event.key === ZOOM_TARGET_KEYBOARD || event.key === DRAG_TARGET_KEYBOARD;
    if (isTargetKeydown) {
      setIsKeydown(false);
    }
  }

  function handleWheel(event: WheelEvent<HTMLDivElement>) {
    if (!isKeydown) return;

    const isWheelUp = event.deltaY < 0;

    const updatedScale = scale + (isWheelUp ? unit : unit * -1);

    if (isWheelUp) {
      updatedScale < maxScale && setScale(updatedScale);
    } else {
      updatedScale > minScale && setScale(updatedScale);
    }
  }

  // motion value 초기화 후 store update
  useEffect(() => {
    setStagePosition({ x: motionX, y: motionY });
  }, []);

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
        className={cn(
          "relative size-[4000px] bg-bodyBg",
          isKeydown && "cursor-grab"
        )}
        style={{ scale, x: stagePosition.x ?? 0, y: stagePosition.y ?? 0 }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

export default Stage;
