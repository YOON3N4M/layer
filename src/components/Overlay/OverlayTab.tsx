import useDataSync from "@/hooks/useDataSync";
import { Memo, MemoPosition } from "@/types";
import { IconTrash } from "../svg";

interface OverlayTabProps {
  memo: Memo;
  //   pos: MemoPosition;
}

function OverlayTab(props: OverlayTabProps) {
  const { memo } = props;
  const { id, isPin } = memo;

  const { removeMemo, editMemo } = useDataSync();

  function handleDeleteClick() {
    removeMemo(id);
  }

  return (
    <div className="w-full px-sm py-xs flex cursor-pointer justify-end border-b border-b-itemBorder gap-xs text-sm">
      <button
        onClick={handleDeleteClick}
        className="opacity-40 hover:opacity-60 transition-opacity"
      >
        <IconTrash />
      </button>

      {/* <button onClick={handlePinClick} className="opacity-30">
        <IconPin fill={isPin ? "black" : "white"} />
      </button> */}
    </div>
  );
}

export default OverlayTab;
