import { IconTrash } from "@/components/svg";
import useDataSync from "@/hooks/useDataSync";
import { Todo } from "@/types";
import { cn, generateNewTodoItem } from "@/utils";
import {
  ChangeEvent,
  Dispatch,
  KeyboardEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";

interface TodoListItemProps {
  todo: Todo;
  index: number;
  setTodolist: Dispatch<SetStateAction<Todo[]>>;
}

export default function TodoListItem(props: TodoListItemProps) {
  const { todo, index, setTodolist } = props;
  const { isDone: isDoneData, body: bodyData, id } = todo;

  const {} = useDataSync();

  const [isShiftDown, setIsShiftdown] = useState(false);

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

  function handleKeydown(event: KeyboardEvent<HTMLInputElement>) {
    console.log(event.key);

    if (event.key === "Shift") {
      setIsShiftdown(true);
    }

    if (event.key === "Backspace") {
      // 삭제
      if (body === "") {
        setTodolist((prevTodoList) => {
          const filtered = prevTodoList.filter((item) => item.id !== id);
          return filtered;
        });
      }
    }
    // 추가
    if (event.key === "Enter") {
      if (event.nativeEvent.isComposing) {
        return;
      }
      if (isShiftDown) return;
      console.log("생성");
      const newTodoItem = generateNewTodoItem();
      setTodolist((prev) => [...prev, newTodoItem]);
    }
  }

  function handleKeyUp(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Shift") {
      setIsShiftdown(false);
    }
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
      className=" flex items-start gap-xs"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <button
        tabIndex={-1}
        onClick={handleOnClickCheckBox}
        className={cn(
          "size-[16px] border-2 rounded-md border-blue-300 shrink-0 transition-colors",
          isDone && "bg-blue-300"
        )}
      />
      <input
        onChange={handleOnChangeTodoBody}
        className={cn(
          "transition-colors bg-black outline-none flex-1",
          isDone && "opacity-70 line-through"
        )}
        onKeyDown={handleKeydown}
        onKeyUp={handleKeyUp}
        value={body}
      ></input>
      <button
        tabIndex={-1}
        onClick={handleOnclickDelete}
        className={cn("ml-auto shrink-0  opacity-0", isHover && "!opacity-100")}
      >
        <IconTrash />
      </button>
    </div>
  );
}
