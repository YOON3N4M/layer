"use client";

import { useState } from "react";
import { IconEye, IconEyeOff, IconLayer } from "../svg";
import { cn } from "@/utils";
import { useLayerList, useMemoList } from "@/state";
import { Layer } from "@/types";
import useDataSync from "@/hooks/useDataSync";

interface SideMenuProps {}

function SideMenu(props: SideMenuProps) {
  const {} = props;

  const [isHide, setIsHide] = useState(false);

  const layerList = useLayerList();

  function handleMenuHideClick() {
    setIsHide((prev) => !prev);
  }

  return (
    <div
      className={cn(
        "fixed right-0 top-0 h-screen border shadow-sm z-sideMenu w-[250px] bg-white/40 backdrop-blur-sm transition-transform",
        isHide && "translate-x-full"
      )}
    >
      <div className="size-full relative">
        <button
          onClick={handleMenuHideClick}
          className={cn(
            "absolute right-full w-max top-[30%] mr-md opacity-30 hover:opacity-100 transition-opacity"
          )}
        >
          {isHide ? "SHOW MENU" : "HIDE MENU"}
        </button>
        <div className="size-full">
          {layerList.map((layer) => (
            <LayerItem key={layer.id} layer={layer} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default SideMenu;

interface LayerItemProps {
  layer: Layer;
}

function LayerItem(props: LayerItemProps) {
  const { layer } = props;
  const { isHide, id } = layer;

  const { editLayer } = useDataSync();
  const memoList = useMemoList();
  const childrenMemoList = memoList.filter((memo) => memo.parentLayerId === id);
  const isNoChildren = childrenMemoList.length < 1;

  function handleLayerHideClick() {
    const newLayer = { ...layer, isHide: !isHide };
    editLayer(newLayer);
  }

  return (
    <div className={cn("transition-colors", isHide && "text-gray-400")}>
      <div className={cn("w-full p-lg border-b flex")}>
        <div className="flex items-center gap-sm">
          <IconLayer />
          <span>{layer.name}</span>
        </div>
        <button
          onClick={handleLayerHideClick}
          className="ml-auto text-gray-400"
        >
          {isHide ? <IconEyeOff /> : <IconEye />}
        </button>
      </div>
      <div>
        {childrenMemoList.map((memo) => (
          <div
            key={`layer-${id}-memo-${memo.id}`}
            className="px-xxl py-xs border-b text-sm truncate"
          >
            {memo.body === "" ? "빈 메모" : memo.body}
          </div>
        ))}
      </div>
    </div>
  );
}
