export interface Layer {
  id: number;
  isHide: boolean;
  name: string;
}

export type MemoType = "memo" | "todo" | "canvas";
export interface MemoPosition {
  x: number;
  y: number;
}

export interface Memo {
  id: number;
  type: MemoType;
  parentLayerId: number;
  body: string;
  position?: MemoPosition;
}
