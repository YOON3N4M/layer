import { Layer, Memo } from "@/types";

function getLayer() {
  const layerValue = localStorage.getItem("layer");
  const layerList = layerValue ? JSON.parse(layerValue) : [];
  return layerList;
}

function addLayer(layer: Layer) {
  const layerList = getLayer();
  layerList.push(layer);
  localStorage.setItem("layer", JSON.stringify(layerList));
}

function getMemo() {
  const memoValue = localStorage.getItem("memo");
  const memoList = memoValue ? JSON.parse(memoValue) : [];
  return memoList;
}

function addMemo(memo: Memo) {
  const memoList = getMemo();
  memoList.push(memo);
  localStorage.setItem("memo", JSON.stringify(memoList));
}

function saveMemo(memo: Memo) {
  const memoList = getMemo() as Memo[];
  const targetIndex = memoList.findIndex((item) => item.id === memo.id);

  if (targetIndex !== -1) {
    // 2. 해당 인덱스의 요소를 새 객체로 교체
    memoList[targetIndex] = memo;
  }

  localStorage.setItem("memo", JSON.stringify(memoList));
}

export const handleLocalStorage = {
  getLayer,
  addLayer,
  getMemo,
  addMemo,
  saveMemo,
};
