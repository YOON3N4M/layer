"use client";

import { useState } from "react";
import { IconAddFile, IconPencilePlus, IconPlus } from "./svg";
import { useLayerList, useMemoActions } from "@/state";
import { generateNewLayer, generateNewMemo } from "@/utils";
import { handleLocalStorage } from "@/utils/localstorage";
import useDataSync from "@/hooks/useDataSync";
import { MemoType } from "@/types";

interface CreateMemoButtonProps {}

const MEMO_TYPE_LIST = ["MEMO"];

function CreateMemoButton(props: CreateMemoButtonProps) {
  const {} = props;

  const [isHide, setIsHide] = useState(true);

  const { createLayer, createMemo } = useDataSync();

  function handleHideClick() {
    setIsHide((prev) => !prev);
  }

  function handleCreateLayerClick() {
    createLayer();
  }

  function handleCreateMemoClick(type: MemoType) {
    createMemo(type);
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
                새 레이어
              </button>
              <button
                onClick={() => handleCreateMemoClick("memo")}
                className="w-full p-md border-b"
              >
                새 메모
              </button>
              <button
                onClick={() => handleCreateMemoClick("todo")}
                className="w-full p-md border-b"
              >
                새 할일
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
