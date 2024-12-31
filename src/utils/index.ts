import { Layer, Memo, MemoType } from "@/types";

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
  return {
    id: Date.now(),
    parentLayerId,
    type,
    body: "",
  };
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
