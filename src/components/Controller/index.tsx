"use client";

import {
  useLayerContainerActions,
  useScale,
  useStagePosition,
} from "@/containers/layer/state";
import { IconMinimize } from "../svg";

interface ControllerProps {}

function Controller(props: ControllerProps) {
  const {} = props;

  const scale = useScale();
  const stagePosition = useStagePosition();
  const { setScale } = useLayerContainerActions();

  function handleMinimizeClick() {
    setScale(1);
    if (!stagePosition.x || !stagePosition.y) return;
    const { x, y } = stagePosition;

    x.set(0);
    y.set(0);
    window.scrollTo(0, 0);
  }

  return (
    <div className="fixed x-center bottom-[100px] z-sideMenu bg-black rounded-md shadow-sm border border-itemBorder opacity-40 hover:opacity-100 transition-opacity">
      <div className="flex px-lg py-sm gap-sm items-center">
        <div className="flex items-center gap-xs bg-bodyBg px-xs py-xxs">
          <span>{`${Math.trunc(scale * 100)}%`}</span>
          <button onClick={handleMinimizeClick}>
            <IconMinimize />
          </button>
        </div>
        <span>Controller</span>
      </div>
    </div>
  );
}

export default Controller;
