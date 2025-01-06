export interface Layer {
  id: number;
  isHide: boolean;
  name: string;
}

export type Memo = NoteMemo | TodoMemo | CanvasMemo;
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

export interface CanvasMemo extends MemoTemplate {
  type: "canvas";
  dataURL?: string;
}

export interface NoteMemo extends MemoTemplate {
  type: "memo";
  body: string;
}
export interface TodoMemo extends MemoTemplate {
  type: "todo";
  todoList: Todo[];
}

export interface Todo {
  id: number;
  isDone: boolean;
  body: string;
}
