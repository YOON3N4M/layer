import { CanvasMemo, NoteMemo } from "@/types";

import { MouseEvent, useEffect, useRef, useState } from "react";
import useDataSync from "@/hooks/useDataSync";
import Overlay, { OverlayProps } from "..";
import { setDataURLToCanvasContext } from "@/utils";

interface CanvasOverlayProps extends OverlayProps {
  memo: CanvasMemo;
}

function CanvasOverlay(props: CanvasOverlayProps) {
  const { memo, stageRef } = props;

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [getCtx, setGetCtx] = useState<CanvasRenderingContext2D | null>(null);
  const [dataURL, setDataURL] = useState("");
  const [isPainting, setIsPainting] = useState(false);

  const { editMemo } = useDataSync();

  function drawHandler(event: MouseEvent<HTMLCanvasElement>) {
    if (!getCtx) return;
    if (!canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    if (!isPainting) {
      getCtx.beginPath();
      getCtx.moveTo(mouseX, mouseY);
    } else {
      getCtx.lineTo(mouseX, mouseY);
      getCtx.stroke();
    }
  }

  function handleMouseUpAndLeave() {
    setIsPainting(false);
    saveCanvasDataURL();
  }

  function saveCanvasDataURL() {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const currentDataURL = canvas.toDataURL("image/png");
    const isURLChange = dataURL !== currentDataURL;

    if (!isURLChange) return;

    const newMemo = { ...memo, dataURL: currentDataURL };
    editMemo(newMemo);

    console.log("저장", isURLChange);
    setDataURL(currentDataURL);
  }

  // 캔버스 초기화
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = canvas.offsetWidth; // CSS 너비를 실제 너비로 설정
    canvas.height = canvas.offsetHeight; // CSS 높이를 실제 높이로 설정
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.lineJoin = "round";
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = "#ffffff";
    setGetCtx(ctx);
    const initialURL = memo.dataURL ?? canvas.toDataURL("image/png");
    setDataURL(initialURL);

    if (memo.dataURL) {
      setDataURLToCanvasContext(ctx, initialURL);
    }
    console.log(getCtx);
  }, []);

  return (
    <Overlay memo={memo} stageRef={stageRef}>
      <div className="size-full min-w-[500px] min-h-[500px]">
        <canvas
          className="size-[500px]"
          ref={canvasRef}
          onMouseDown={() => setIsPainting(true)}
          onMouseMove={(e) => drawHandler(e)}
          onMouseUp={handleMouseUpAndLeave}
          onMouseLeave={handleMouseUpAndLeave}
        ></canvas>
      </div>
    </Overlay>
  );
}

export default CanvasOverlay;
