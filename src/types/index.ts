export interface Layer {
  id: number;
  isHide: boolean;
  name: string;
}

export type Memo = NoteMemo | TodoMemo;
export type MemoType = "memo" | "todo" | "canvas";
export interface MemoPosition {
  x: number;
  y: number;
}

export interface MemoTemplate {
  id: number;
  parentLayerId: number;
  position?: MemoPosition;
}

export interface NoteMemo extends MemoTemplate {
  type: "memo";
  body: string;
}

export interface Todo {
  isDone: boolean;
  body: string;
}
export interface TodoMemo extends MemoTemplate {
  type: "todo";
  todoList: Todo[];
}
