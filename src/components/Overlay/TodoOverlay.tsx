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
import Overlay, { OverlayProps } from ".";
import { IconTrash } from "../svg";

interface TodoOverlayProps extends OverlayProps {
  memo: TodoMemo;
}

function TodoOverlay(props: TodoOverlayProps) {
  const { memo } = props;
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
    <Overlay memo={memo}>
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

interface TodoListItemProps {
  todo: Todo;
  index: number;
  setTodolist: Dispatch<SetStateAction<Todo[]>>;
}

function TodoListItem(props: TodoListItemProps) {
  const { todo, index, setTodolist } = props;
  const { isDone: isDoneData, body: bodyData, id } = todo;

  const [isDone, setisDone] = useState(isDoneData);
  const [body, setBody] = useState(bodyData);
  const [isHover, setIsHover] = useState(false);

  // 부모 컴포넌트의 useEffect를 트리거
  function setData(newTodo: Todo) {
    setTodolist((prevTodoList) => {
      const newtodoList = [...prevTodoList];
      newtodoList[index] = newTodo;
      return newtodoList;
    });
  }

  function handleOnClickCheckBox() {
    let newIsDoneState = isDone;
    setisDone((prev) => {
      newIsDoneState = !prev;
      return !prev;
    });
    const newTodo: Todo = { ...todo, isDone: newIsDoneState };
    setData(newTodo);
  }

  function handleOnChangeTodoBody(event: ChangeEvent<HTMLInputElement>) {
    setBody(event.target.value);
  }

  function handleOnclickDelete() {
    setTodolist((prevTodoList) => {
      const filtered = prevTodoList.filter((item) => item.id !== id);
      return filtered;
    });
  }

  useEffect(() => {
    if (body === "") return;

    const timeoutId = setTimeout(() => {
      const newTodo = { ...todo, body };
      setData(newTodo);
    }, 1000);
    // 컴포넌트가 다시 렌더링되거나 unmount될 때 타이머를 정리
    return () => clearTimeout(timeoutId);
  }, [body]); // text와 savedText가 변경될 때 실행

  return (
    <div
      className=" flex items-center gap-xs"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div
        onClick={handleOnClickCheckBox}
        className={cn(
          "size-[16px] border-2 rounded-md border-blue-300 shrink-0 transition-colors",
          isDone && "bg-blue-300"
        )}
      />
      <input
        onChange={handleOnChangeTodoBody}
        className={cn(
          "transition-colors bg-black outline-none",
          isDone && "opacity-70 line-through"
        )}
        placeholder={bodyData}
        value={body}
      ></input>
      <button
        onClick={handleOnclickDelete}
        className={cn("ml-auto shrink-0  opacity-0", isHover && "!opacity-100")}
      >
        <IconTrash />
      </button>
    </div>
  );
}
