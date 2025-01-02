import { useLayerList, useMemoActions } from "@/state";
import { Memo } from "@/types";
import { generateNewLayer, generateNewMemo } from "@/utils";
import { handleLocalStorage } from "@/utils/localstorage";

//여기서 로컬스토리지와 state를 동시에 제어하도록 해야할듯
function useDataSync() {
  const layerList = useLayerList();
  const { addMemo, addLayer, editMemo: editStoreMemo } = useMemoActions();

  function createLayer() {
    const newLayer = generateNewLayer(`layer ${layerList.length}`);
    handleLocalStorage.addLayer(newLayer);
    addLayer(newLayer);

    return newLayer;
  }

  function createMemo() {
    let parentLayer = layerList[layerList.length - 1];

    // 레어아가 하나도 존재하지 않으면 새 레이어도 생성
    if (!parentLayer) {
      parentLayer = createLayer();
    }

    const newMemo = generateNewMemo("memo", parentLayer.id);
    handleLocalStorage.addMemo(newMemo);
    addMemo(newMemo);
  }

  function editMemo(memo: Memo) {
    handleLocalStorage.editMemo(memo);
    editStoreMemo(memo);
  }

  return { createLayer, createMemo, editMemo };
}

export default useDataSync;
