import { IconCheckList, IconNote } from "@/components/svg";
import { MemoType } from "@/types";
import { IconType } from "react-icons";

export interface MemoData {
  eng: MemoType;
  kor: string;
  icon: JSX.Element;
}

export const MEMO_DATA_LIST: MemoData[] = [
  { eng: "todo", kor: "할 일", icon: <IconCheckList /> },
  { eng: "memo", kor: "메모", icon: <IconNote /> },
];
