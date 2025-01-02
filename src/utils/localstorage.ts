import { Layer, Memo } from "@/types";

const LAYER_KEY = "layer-layer";
const MEMO_KEY = "layer-memo";

function getLayer() {
  const layerValue = localStorage.getItem(LAYER_KEY);
  const layerList = layerValue ? JSON.parse(layerValue) : [];
  return layerList;
}

function addLayer(layer: Layer) {
  const layerList = getLayer();
  layerList.push(layer);
  localStorage.setItem(LAYER_KEY, JSON.stringify(layerList));
}

function editLayer(layer: Layer) {
  const layerList = getLayer() as Layer[];
  const targetIndex = layerList.findIndex((item) => item.id === layer.id);

  if (targetIndex !== -1) {
    // 2. 해당 인덱스의 요소를 새 객체로 교체
    layerList[targetIndex] = layer;
  }

  localStorage.setItem(LAYER_KEY, JSON.stringify(layerList));
}

function removeLayer(layerId: number) {
  const layerList = getLayer() as Layer[];
  const filteredLayerList = layerList.filter((layer) => layer.id !== layerId);

  localStorage.setItem(LAYER_KEY, JSON.stringify(filteredLayerList));
}

//메모
function getMemo() {
  const memoValue = localStorage.getItem(MEMO_KEY);
  const memoList = memoValue ? JSON.parse(memoValue) : [];
  return memoList;
}

function addMemo(memo: Memo) {
  const memoList = getMemo();
  memoList.push(memo);
  localStorage.setItem(MEMO_KEY, JSON.stringify(memoList));
}

function editMemo(memo: Memo) {
  const memoList = getMemo() as Memo[];
  const targetIndex = memoList.findIndex((item) => item.id === memo.id);

  if (targetIndex !== -1) {
    // 2. 해당 인덱스의 요소를 새 객체로 교체
    memoList[targetIndex] = memo;
  }

  localStorage.setItem(MEMO_KEY, JSON.stringify(memoList));
}

function setMemoList(memoList: Memo[]) {
  localStorage.setItem(MEMO_KEY, JSON.stringify(memoList));
}

function removeMemo(id: number) {
  const memoList = getMemo() as Memo[];
  const filteredMemoList = memoList.filter((memo) => memo.id !== id);

  localStorage.setItem(MEMO_KEY, JSON.stringify(filteredMemoList));
}

export const handleLocalStorage = {
  getLayer,
  addLayer,
  editLayer,
  removeLayer,
  getMemo,
  addMemo,
  removeMemo,
  editMemo,
  setMemoList,
};
