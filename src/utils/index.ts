import { Layer, Memo, MemoType, Todo } from "@/types";

export const cn = (...classNames: (string | false | undefined)[]) => {
  const styledClassNames = [...classNames]
    .map((className) => className && className.split(" "))
    .flat()
    .filter((className) => className);

  return styledClassNames.join(" ");
};

/**
 * 새 메모를 생성하는 함수
 */
export function generateNewMemo(type: MemoType, parentLayerId: number): Memo {
  const newMemo: any = {
    id: Date.now(),
    parentLayerId,
    body: "",
    type,
  };

  switch (type) {
    case "memo":
      newMemo.body = "";
      break;
    case "todo":
      const newTodo: Todo = { isDone: false, body: "새 할일 목록" };
      newMemo.todoList = [newTodo];
      break;
  }

  return newMemo;
}

/**
 * 새 레이어를 생성하는 함수
 */
export function generateNewLayer(name: string): Layer {
  return {
    id: Date.now(),
    isHide: false,
    name,
  };
}
