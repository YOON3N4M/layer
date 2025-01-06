import {
  useLayerContainerActions,
  useSelectedLayerId,
} from "@/containers/layer/state";
import { useLayerList, useMemoActions, useMemoList } from "@/state";
import { Layer, Memo, MemoType } from "@/types";
import { generateNewLayer, generateNewMemo } from "@/utils";
import { handleLocalStorage } from "@/utils/localstorage";

//여기서 로컬스토리지와 state를 동시에 제어하도록 해야할듯
function useDataSync() {
  const layerList = useLayerList();
  const {
    addLayer,
    editLayer: editStateLayer,
    removeLayer: removeStateLayer,
    addMemo,
    removeMemo: removeStateMemo,
    editMemo: editStateMemo,
    setMemoList,
  } = useMemoActions();

  const selectedLayerId = useSelectedLayerId();
  const memoList = useMemoList();
  const { setSelectedLayerId } = useLayerContainerActions();
  //레이어
  function createLayer() {
    const newLayer = generateNewLayer(`layer ${layerList.length}`);
    handleLocalStorage.addLayer(newLayer);
    addLayer(newLayer);

    return newLayer;
  }
  function editLayer(layer: Layer) {
    handleLocalStorage.editLayer(layer);
    editStateLayer(layer);
  }
  function removeLayer(layerId: number) {
    const filteredMemoList = memoList.filter(
      (memo) => memo.parentLayerId !== layerId
    );

    console.log(filteredMemoList);
    handleLocalStorage.setMemoList(filteredMemoList);
    handleLocalStorage.removeLayer(layerId);

    removeStateLayer(layerId);
    setMemoList(filteredMemoList);
    setSelectedLayerId(null);
    console.log(selectedLayerId);
  }
  // 메모
  function createMemo(type: MemoType) {
    let parentLayer = layerList[layerList.length - 1];
    console.log(parentLayer);
    // 레어아가 하나도 존재하지 않으면 새 레이어도 생성
    if (!parentLayer) {
      parentLayer = createLayer();
    }

    let newMemo;
    if (selectedLayerId) {
      newMemo = generateNewMemo(type, selectedLayerId);
    } else {
      newMemo = generateNewMemo(type, parentLayer.id);
    }

    handleLocalStorage.addMemo(newMemo);
    addMemo(newMemo);
    console.log(parentLayer, selectedLayerId, newMemo);
  }

  function editMemo(memo: Memo) {
    handleLocalStorage.editMemo(memo);
    editStateMemo(memo);
  }

  function removeMemo(id: number) {
    handleLocalStorage.removeMemo(id);
    removeStateMemo(id);
  }
  return {
    createLayer,
    editLayer,
    removeLayer,
    createMemo,
    editMemo,
    removeMemo,
  };
}

export default useDataSync;
