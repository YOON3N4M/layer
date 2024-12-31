"use client";

import { useState } from "react";
import { IconEye, IconEyeOff } from "../svg";
import { cn } from "@/utils";

interface SideMenuProps {}

const EXAMPLE_LAYER = ["업무", "일상", 3, 4, 5];

function SideMenu(props: SideMenuProps) {
  const {} = props;

  const [isHide, setIsHide] = useState(false);

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
          {EXAMPLE_LAYER.map((item) => (
            <LayerItem key={item} name={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default SideMenu;

function LayerItem({ name }: { name: any }) {
  const [isHide, setIsHide] = useState(false);

  function handleLayerHideClick() {
    setIsHide((prev) => !prev);
  }

  return (
    <div className="w-full p-lg border-b flex">
      <span className={cn("transition-colors", isHide && "text-gray-400")}>
        {name}
      </span>
      <button onClick={handleLayerHideClick} className="ml-auto text-gray-400">
        {isHide ? <IconEyeOff /> : <IconEye />}
      </button>
    </div>
  );
}
