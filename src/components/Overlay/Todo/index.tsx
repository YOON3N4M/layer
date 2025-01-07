import useDataSync from "@/hooks/useDataSync";
import { useLayerList } from "@/state";
import { Todo, TodoMemo } from "@/types";
import { checkArrayDiffer, cn, generateNewTodoItem } from "@/utils";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import Overlay, { OverlayProps } from "..";
import { IconTrash } from "@/components/svg";
import TodoListItem from "./TodoItem";

interface TodoOverlayProps extends OverlayProps {
  memo: TodoMemo;
}

function TodoOverlay(props: TodoOverlayProps) {
  const { memo, stageRef } = props;
  const { id, todoList: todoListData } = memo;

  const [todoList, setTodolist] = useState(todoListData);
  const { editMemo, removeMemo } = useDataSync();
  const layerList = useLayerList();

  //   function handleTextareaChange(event: ChangeEvent<HTMLTextAreaElement>) {
  //     setBody(event.target.value);
  //   }

  const isChange = !checkArrayDiffer(memo.todoList, todoList);

  useEffect(() => {
    if (!isChange) return;
    // 디바운스 효과: 1초 후에 저장
    const timeoutId = setTimeout(() => {
      const newMemo = { ...memo, todoList };
      editMemo(newMemo);
      console.log("저장", memo.id);
    }, 1000);
    // 컴포넌트가 다시 렌더링되거나 unmount될 때 타이머를 정리
    return () => clearTimeout(timeoutId);
  }, [todoList]); // text와 savedText가 변경될 때 실행

  function addTodoItem() {
    const newTodoItem = generateNewTodoItem();
    setTodolist((prev) => [...prev, newTodoItem]);
  }

  return (
    <Overlay stageRef={stageRef} memo={memo}>
      <div className="mt-sm text-sm px-sm group size-full">
        <div className="flex flex-col gap-xxs">
          {todoList.map((todo, idx) => (
            <TodoListItem
              key={`todo-overlay-${todo.id}`}
              setTodolist={setTodolist}
              todo={todo}
              index={idx}
            />
          ))}
        </div>
        <div className="w-full text-center text-text mt-sm rounded-md bg-bodyBg transition-opacity opacity-0 group-hover:opacity-100">
          <button className="size-full" onClick={addTodoItem}>
            할일 추가
          </button>
        </div>
      </div>
    </Overlay>
  );
}

export default TodoOverlay;
