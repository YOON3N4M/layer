import useDataSync from "@/hooks/useDataSync";
import { IconPin, IconTrash } from "../svg";

interface OverlayTabProps {
  memoId: number;
}

function OverlayTab(props: OverlayTabProps) {
  const { memoId } = props;

  const { removeMemo } = useDataSync();

  function handleDeleteClick() {
    removeMemo(memoId);
  }

  return (
    <div className="w-full px-sm py-xs flex justify-end border-b gap-xs text-sm">
      <button onClick={handleDeleteClick} className="opacity-30">
        <IconTrash />
      </button>
      <button className="opacity-30">
        <IconPin />
      </button>
    </div>
  );
}

export default OverlayTab;
