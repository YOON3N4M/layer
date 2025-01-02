"use client";

import Overlay from "@/components/Overlay";
import NoteOverlay from "@/components/Overlay/NoteOverlay";
import { useMemoActions, useMemoList } from "@/state";
import { Memo } from "@/types";
import { handleLocalStorage } from "@/utils/localstorage";
import { useEffect } from "react";

interface LayerContainerProps {}

function LayerContainer(props: LayerContainerProps) {
  const {} = props;

  const { setLayerList, setMemoList } = useMemoActions();

  const memoList = useMemoList();

  // 초기 로딩
  useEffect(() => {
    const localLayerList = handleLocalStorage.getLayer();
    const localMemoList = handleLocalStorage.getMemo();
    setLayerList(localLayerList);
    setMemoList(localMemoList);
  }, []);

  return (
    <div className="flex">
      {/* memo display */}
      <div className="flex mt-[100px]">
        {memoList.map((memo) => (
          <RenderOverlay key={memo.id} memo={memo} />
        ))}
      </div>
    </div>
  );
}

export default LayerContainer;

function RenderOverlay({ memo }: { memo: Memo }) {
  const { type } = memo;

  switch (type) {
    case "memo":
      return <NoteOverlay memo={memo} />;
    case "todo":
      return <></>;
  }
}
