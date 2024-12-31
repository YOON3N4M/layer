"use client";

import { useState } from "react";
import { IconAddFile, IconPencilePlus, IconPlus } from "./svg";
import { useLayerList, useMemoActions } from "@/state";
import { generateNewLayer, generateNewMemo } from "@/utils";
import { handleLocalStorage } from "@/utils/localstorage";

interface CreateMemoButtonProps {}

const MEMO_TYPE_LIST = ["MEMO"];

function CreateMemoButton(props: CreateMemoButtonProps) {
  const {} = props;

  const [isHide, setIsHide] = useState(true);

  const layerList = useLayerList();
  const { addMemo, addLayer } = useMemoActions();

  function handleHideClick() {
    setIsHide((prev) => !prev);
  }

  function handleCreateLayerClick() {
    const newLayer = generateNewLayer(`layer ${layerList.length}`);
    handleLocalStorage.addLayer(newLayer);
    addLayer(newLayer);
  }

  function handleCreateMemoClick() {
    const newMemo = generateNewMemo("memo", layerList[0].id);
    handleLocalStorage.addMemo(newMemo);
    addMemo(newMemo);
    handleHideClick();
  }

  return (
    <div className="fixed right-[5%] bottom-[10%] z-craete">
      {!isHide && (
        <div className="relative">
          <div className="absolute w-[300px] h-[450px] bg-white right-full bottom-0 translate-x-[10%]">
            <div className="size-full flex flex-col">
              <button
                onClick={handleCreateLayerClick}
                className="w-full p-md border-b"
              >
                New Layer
              </button>
              <button
                onClick={handleCreateMemoClick}
                className="w-full p-md border-b"
              >
                New memo
              </button>
            </div>
          </div>
        </div>
      )}
      <button
        onClick={handleHideClick}
        className="group  bg-white rounded-full p-xl hover:bg-slate-200 transition-colors"
      >
        <span className="opacity-40 group-hover:text-black text-xl">
          <IconPencilePlus />
        </span>
      </button>
    </div>
  );
}

export default CreateMemoButton;
