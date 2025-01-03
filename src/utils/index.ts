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
    type,
    isPin: false,
  };

  switch (type) {
    case "memo":
      newMemo.body = "";
      break;
    case "todo":
      newMemo.todoList = [generateNewTodoItem()];
      break;
  }

  return newMemo;
}

export function generateNewTodoItem() {
  const newTodo: Todo = {
    isDone: false,
    body: "",
    id: Date.now(),
  };

  return newTodo;
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

/**
 * 두 배열을 비교해 차이 여부를 boolean으로 반환
 */
export function checkArrayDiffer(a: any[], b: any[]) {
  const result = JSON.stringify(a) === JSON.stringify(b);
  return result;
}
/**
 * 두 객체를 비교해 차이 여부를 boolean으로 반환
 */
export function checkObjectDiffer(obj1: any, obj2: any) {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) return true;

  return !keys1.every((key) => obj1[key] === obj2[key]);
}
