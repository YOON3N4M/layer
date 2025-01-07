"use client";

import { useMemoActions, useMemoList } from "@/state";
import { Memo } from "@/types";
import { handleLocalStorage } from "@/utils/localstorage";
import { RefObject, useEffect, useRef } from "react";
import Stage from "./Stage";
import TodoOverlay from "@/components/Overlay/Todo";
import CanvasOverlay from "@/components/Overlay/Canvas";
import NoteOverlay from "@/components/Overlay/Note";

interface LayerContainerProps {}

function LayerContainer(props: LayerContainerProps) {
  const {} = props;

  const { setLayerList, setMemoList } = useMemoActions();

  const memoList = useMemoList();

  const stageRef = useRef<HTMLDivElement>(null);

  // 초기 로딩
  useEffect(() => {
    const localLayerList = handleLocalStorage.getLayer();
    const localMemoList = handleLocalStorage.getMemo();
    setLayerList(localLayerList);
    setMemoList(localMemoList);
  }, []);

  return (
    <Stage stageRef={stageRef}>
      {memoList.map((memo) => (
        <RenderOverlay stageRef={stageRef} key={memo.id} memo={memo} />
      ))}
    </Stage>
  );
}

export default LayerContainer;

function RenderOverlay({
  memo,
  stageRef,
}: {
  memo: Memo;
  stageRef: RefObject<HTMLDivElement>;
}) {
  const { type } = memo;

  switch (type) {
    case "memo":
      return <NoteOverlay stageRef={stageRef} memo={memo} />;
    case "todo":
      return <TodoOverlay stageRef={stageRef} memo={memo} />;
    case "canvas":
      return <CanvasOverlay stageRef={stageRef} memo={memo} />;
  }
}
