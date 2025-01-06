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
  isPin: boolean;
  position?: MemoPosition;
  size?: { width?: number; height?: number };
}

export interface NoteMemo extends MemoTemplate {
  type: "memo";
  body: string;
}

export interface Todo {
  id: number;
  isDone: boolean;
  body: string;
}
export interface TodoMemo extends MemoTemplate {
  type: "todo";
  todoList: Todo[];
}
