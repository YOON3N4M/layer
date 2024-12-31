import { Layer, Memo } from "@/types";
import { create } from "zustand";

interface MemoStore {
  layerList: Layer[];
  memoList: Memo[];
  actions: {
    setLayerList: (layerList: Layer[]) => void;
    addLayer: (layer: Layer) => void;
    removeLayer: (id: number) => void;
    setMemoList: (memoList: Memo[]) => void;
    addMemo: (memo: Memo) => void;
    removeMemo: (id: number) => void;
  };
}

const useMemoStore = create<MemoStore>((set) => ({
  layerList: [],
  memoList: [],
  actions: {
    setLayerList: (layerList) => set({ layerList }),
    addLayer: (layer) =>
      set((state) => ({ layerList: [...state.layerList, layer] })),
    removeLayer: (id) =>
      set((state) => ({
        layerList: state.layerList.filter((layer) => layer.id !== id),
      })),
    setMemoList: (memoList) => set({ memoList }),
    addMemo: (memo) =>
      set((state) => ({ memoList: [...state.memoList, memo] })),
    removeMemo: (id) =>
      set((state) => ({
        memoList: state.memoList.filter((memo) => memo.id !== id),
      })),
  },
}));

export const useLayerList = () => useMemoStore((state) => state.layerList);
export const useMemoList = () => useMemoStore((state) => state.memoList);

export const useMemoActions = () => useMemoStore((state) => state.actions);
