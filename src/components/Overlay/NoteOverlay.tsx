import { ChangeEvent, useEffect, useState } from "react";
import Overlay, { OverlayProps } from ".";
import { IconPin, IconTrash } from "../svg";
import { Memo } from "@/types";
import { handleLocalStorage } from "@/utils/localstorage";

interface NoteOverlayProps extends OverlayProps {
  memo: Memo;
}

function NoteOverlay(props: NoteOverlayProps) {
  const { memo } = props;

  const [body, setBody] = useState(memo.body);

  function handleTextareaChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setBody(event.target.value);
  }

  useEffect(() => {
    // 디바운스 효과: 1초 후에 저장
    const timeoutId = setTimeout(() => {
      const newMemo = { ...memo, body };
      handleLocalStorage.saveMemo(newMemo);
      console.log("저장", memo.id);
    }, 1000);

    // 컴포넌트가 다시 렌더링되거나 unmount될 때 타이머를 정리
    return () => clearTimeout(timeoutId);
  }, [body]); // text와 savedText가 변경될 때 실행

  return (
    <Overlay>
      <div className="w-full px-sm py-xs flex justify-end border-b gap-xs text-sm">
        <button className="opacity-30">
          <IconTrash />
        </button>
        <button className="opacity-30">
          <IconPin />
        </button>
      </div>
      <div className="mt-sm text-sm">
        <textarea
          value={body}
          onChange={handleTextareaChange}
          className="px-sm w-full resize-none outline-none"
        >
          {body}
        </textarea>
      </div>
    </Overlay>
  );
}

export default NoteOverlay;
