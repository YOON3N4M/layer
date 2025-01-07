import useDataSync from "@/hooks/useDataSync";
import { NoteMemo } from "@/types";
import { ChangeEvent, useEffect, useState } from "react";
import Overlay, { OverlayProps } from ".";

interface NoteOverlayProps extends OverlayProps {
  memo: NoteMemo;
}

function NoteOverlay(props: NoteOverlayProps) {
  const { memo, stageRef } = props;
  const { id } = memo;

  const [body, setBody] = useState(memo.body);
  const { editMemo, removeMemo } = useDataSync();

  function handleTextareaChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setBody(event.target.value);
  }

  const isChange = body !== memo.body;

  useEffect(() => {
    if (!isChange) return;
    // 디바운스 효과: 1초 후에 저장
    const timeoutId = setTimeout(() => {
      const newMemo = { ...memo, body };
      editMemo(newMemo);
      console.log("저장", memo.id);
    }, 1000);

    // 컴포넌트가 다시 렌더링되거나 unmount될 때 타이머를 정리
    return () => clearTimeout(timeoutId);
  }, [body]); // text와 savedText가 변경될 때 실행

  return (
    <Overlay stageRef={stageRef} memo={memo}>
      <div className="size-auto mt-sm text-sm">
        <textarea
          value={body}
          onChange={handleTextareaChange}
          className="px-sm w-full resize-none outline-none min-h-[250px] bg-black"
        >
          {body}
        </textarea>
      </div>
    </Overlay>
  );
}

export default NoteOverlay;
