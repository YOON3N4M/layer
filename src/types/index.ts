export interface Layer {
  id: number;
  isHide: boolean;
  name: string;
}

export interface Memo {
  id: number;
  parentLayerId: number;
}
