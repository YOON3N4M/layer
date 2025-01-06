"use client";

import { useState } from "react";
import { IconAddFile, IconLayer, IconPencilePlus, IconPlus } from "./svg";
import { useLayerList, useMemoActions } from "@/state";
import { generateNewLayer, generateNewMemo } from "@/utils";
import { handleLocalStorage } from "@/utils/localstorage";
import useDataSync from "@/hooks/useDataSync";
import { MemoType } from "@/types";
import useClickOutside from "@/hooks/useOutsideEvent";
import { motion } from "motion/react";
import { MEMO_DATA_LIST, MemoData } from "@/data/memo";

interface CreateMemoButtonProps {}

function CreateMemoButton(props: CreateMemoButtonProps) {
  const {} = props;

  const [isHide, setIsHide] = useState(true);

  const { createLayer, createMemo } = useDataSync();

  const ref = useClickOutside(() => {
    if (!isHide) {
      setIsHide(true);
    }
  });

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
    <div
      ref={ref}
      className="fixed right-[5%] bottom-[10%] z-craete rounded-md shadow-md"
    >
      <button
        onClick={handleHideClick}
        className="group bg-black rounded-md p-xl border border-itemBorder"
      >
        <span className="text-text/60 group-hover:text-text/100 text-xl transition-colors">
          <IconPencilePlus />
        </span>
      </button>
      {!isHide && (
        <div className="relative">
          <div className="absolute w-[200px] h-max right-full bottom-full translate-x-[10%] -translate-y-1/2">
            <motion.div className="size-full flex flex-col gap-xs rounded-md">
              {MEMO_DATA_LIST.map((data) => (
                <motion.button
                  key={data.eng}
                  onClick={() => handleCreateMemoClick(data.eng)}
                  className="w-full p-md bg-black border-itemBorder border items-center flex gap-sm hover:brightness-75"
                >
                  <span>{data.icon}</span>
                  <span>{`새 ${data.kor}`}</span>
                </motion.button>
              ))}
              <motion.button
                onClick={handleCreateLayerClick}
                className="w-full p-md bg-black border-itemBorder border items-center flex gap-sm mt-xl hover:brightness-75"
              >
                <span>
                  <IconLayer />
                </span>
                <span> 새 레이어</span>
              </motion.button>
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CreateMemoButton;
