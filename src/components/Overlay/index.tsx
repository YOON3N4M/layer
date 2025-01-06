import useDataSync from "@/hooks/useDataSync";
import { useLayerList } from "@/state";
import { Memo } from "@/types";
import { checkObjectDiffer, cn } from "@/utils";
import { motion, useMotionValue, useMotionValueEvent } from "motion/react";
import {
  HTMLAttributes,
  MouseEvent,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import OverlayTab from "./OverlayTab";
import { useSelectedLayerId } from "@/containers/layer/state";

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
  const {
    position = { x: 0, y: 0 },
    parentLayerId,
    id,
    isPin,
    size: sizeData,
  } = memo;

  const [pos, setPos] = useState(position);
  const [size, setSize] = useState({
    width: sizeData?.width,
    height: sizeData?.height,
  });
  const [isResizing, setIsResizing] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  const { editMemo } = useDataSync();
  const layerList = useLayerList();
  const selectedLayerId = useSelectedLayerId();
  const isSelected = selectedLayerId === memo.parentLayerId;

  const posX = useMotionValue(position.x);
  useMotionValueEvent(posX, "change", (latest) => {
    setPos((prev) => ({ ...prev, x: latest }));
  });

  const posY = useMotionValue(position.y);
  useMotionValueEvent(posY, "change", (latest) => {
    setPos((prev) => ({ ...prev, y: latest }));
  });

  function handleResizeMouseDown() {
    setIsResizing(true);
  }
  function handleResizeMove(event: MouseEvent<HTMLDivElement>) {
    if (!isResizing) return;
    if (!size.width && !size.height) return;
    // 마우스 움직임에 따라 크기 변경
    setSize((prevSize) => ({
      width: prevSize.width! + event.movementX,
      height: prevSize.height! + event.movementY,
    }));
  }

  function handleMouseUp() {
    const isPositionChange = checkObjectDiffer(pos, position);
    const isSizeChange = {};

    if (isPositionChange) {
      const newMemo = { ...memo, position: pos };
      editMemo(newMemo);
    }

    // if (isResizing) {
    // }

    // setIsResizing(false);
  }

  // 저장된 메모 데이터애 사이즈 정보가 없을 경우 기본 사이즈 할당
  useEffect(() => {
    if (sizeData) return;

    const width = overlayRef.current?.offsetWidth;
    const height = overlayRef.current?.offsetHeight;

    setSize((prev) => ({ ...prev, width, height }));
  }, []);

  const parentLayer = layerList.find((layer) => layer.id === parentLayerId);
  const layerIndex = layerList.findIndex((layer) => layer.id === parentLayerId);
  const zIndex = 1000 - layerIndex;
  if (!parentLayer) return;

  const isHide = parentLayer.isHide;
  const isNote = memo.type === "memo";
  const isCanvas = memo.type === "canvas";

  return (
    <motion.div
      ref={overlayRef}
      drag={isResizing ? false : true}
      dragMomentum={false}
      variants={overayVariants}
      initial="hidden"
      animate={isHide ? "hidden" : "show"}
      exit="hidden"
      onMouseUp={handleMouseUp}
      className={cn(
        className,
        "absolute z-overlay border border-itemBorder shadow-sm rounded-[4px] bg-black w-max min-w-[300px] min-h-[300px] transition-colors",
        isSelected && "!border-blue-400",
        !isCanvas && "max-h-[300px]"
      )}
      style={{
        y: posY,
        x: posX,
        zIndex: zIndex,
        width: size.width,
        height: size.height,
      }}
    >
      <div className="relative size-full pb-sm flex flex-col">
        <OverlayTab memo={memo} />
        <div
          className={cn(
            "flex-1",
            isNote ? "overflow-y-hidden" : "overflow-y-auto"
          )}
        >
          {children}
        </div>
      </div>
    </motion.div>
  );
}
export default Overlay;
