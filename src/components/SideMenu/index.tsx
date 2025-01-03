"use client";

import { ChangeEvent, KeyboardEvent, MouseEvent, useState } from "react";
import {
  IconCheckList,
  IconDoubleLeftArrow,
  IconDoubleRightArrow,
  IconEye,
  IconEyeOff,
  IconLayer,
  IconNote,
  IconTrash,
} from "../svg";
import { cn } from "@/utils";
import { useLayerList, useMemoList } from "@/state";
import { Layer, Memo, MemoType } from "@/types";
import useDataSync from "@/hooks/useDataSync";
import {
  useLayerContainerActions,
  useSelectedLayerId,
} from "@/containers/layer/state";
import useClickOutside from "@/hooks/useOutsideEvent";

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
        "fixed right-0 top-0 h-screen border shadow-sm z-sideMenu w-[250px] bg-white backdrop-blur-sm transition-transform",
        isHide && "translate-x-full"
      )}
    >
      <div className="size-full relative">
        <button
          onClick={handleMenuHideClick}
          className={cn(
            "absolute right-full text-3xl w-max top-[30%] mr-md opacity-30 hover:opacity-100 text-blue-400 transition-opacity"
          )}
        >
          {isHide ? <IconDoubleLeftArrow /> : <IconDoubleRightArrow />}
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
  const { isHide, id, name } = layer;

  const [isEditMode, setIsEditMode] = useState(false);
  const [layerName, setLayerName] = useState(name);

  const { editLayer, removeLayer } = useDataSync();
  const memoList = useMemoList();
  const selectedLayerId = useSelectedLayerId();
  const { setSelectedLayerId } = useLayerContainerActions();
  const childrenMemoList = memoList.filter((memo) => memo.parentLayerId === id);

  const isNoChildren = childrenMemoList.length < 1;
  const isSelect = id === selectedLayerId;

  function handleLayerClick() {
    if (isSelect) {
      setSelectedLayerId(null);
    } else {
      if (isHide) return;
      setSelectedLayerId(id);
    }
  }

  function handleLayerHideClick() {
    const newLayer = { ...layer, isHide: !isHide };
    editLayer(newLayer);
  }

  function handleLayerNameDoubleClick() {
    setIsEditMode(true);
  }

  function handleLayerRightClick(event: MouseEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsEditMode((prev) => !prev);
  }

  function handleLayerNameChange(event: ChangeEvent<HTMLInputElement>) {
    setLayerName(event.target.value);
  }

  function handleInputEnter(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      const newLayer = { ...layer, name: layerName };
      editLayer(newLayer);
      setIsEditMode(false);
    }
  }

  function handleRemoveLayerClick() {
    const isConfirmed = confirm(
      "레이어를 삭제하면 해당 레이어에 속한 모든 메모도 함께 삭제 됩니다. 진행하시겠습니까? 유지하고 싶은 메모는 다른 레이어로 옮긴 뒤 다시 시도 해주세요."
    );
    if (!isConfirmed) return;

    removeLayer(id);
  }

  function exitEditMode() {
    setIsEditMode(false);
    setLayerName(name);
  }
  const ref = useClickOutside(exitEditMode);

  return (
    <div
      onClick={handleLayerClick}
      className={cn(
        "transition-colors cursor-pointer",
        isHide && "text-gray-400",
        isSelect && "bg-blue-50 border border-blue-400"
      )}
      onContextMenu={handleLayerRightClick}
    >
      <div
        className={cn(
          "w-full py-sm px-md border-b flex",
          isSelect && "border-gray-300"
        )}
      >
        <div className="w-full flex items-center gap-sm">
          <IconLayer />
          {isEditMode ? (
            <div ref={ref} className="w-full flex items-center">
              <input
                onKeyDown={handleInputEnter}
                onChange={handleLayerNameChange}
                className="w-[70%] rounded-md bg-white border border-blue-400 px-xxs"
                value={layerName}
              ></input>
              <IconTrash
                onClick={handleRemoveLayerClick}
                className="ml-xs text-gray-400"
              />
            </div>
          ) : (
            <span onDoubleClick={handleLayerNameDoubleClick}>{layer.name}</span>
          )}
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
          <MemoListItem key={`layer-${id}-memo-${memo.id}`} memo={memo} />
        ))}
      </div>
    </div>
  );
}

function MemoListItem({ memo }: { memo: Memo }) {
  const { id } = memo;

  return (
    <div className="px-xl py-xs border-b text-sm  flex items-center gap-xs">
      <span>·</span>
      <span className="shrink-0">
        <MemoIcon type={memo.type} />
      </span>
      <MemoPreview memo={memo} />
    </div>
  );
}

function MemoPreview({ memo }: { memo: Memo }) {
  let spanString;
  switch (memo.type) {
    case "memo":
      spanString =
        memo.type === "memo" && (memo.body === "" ? "빈 메모" : memo.body);
      break;
    case "todo":
      spanString = memo.todoList[0] ? memo.todoList[0].body : "";
  }

  return <span className="truncate">{spanString}</span>;
}

function MemoIcon({ type }: { type: MemoType }) {
  switch (type) {
    case "memo":
      return <IconNote />;
    case "todo":
      return <IconCheckList />;
  }
}
