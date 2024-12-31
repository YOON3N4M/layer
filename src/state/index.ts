import { Layer, Memo } from "@/types";
import { create } from "zustand";

interface MemoStore {
  layerList: Layer[];
  memoList: Memo[];
  actions: {
    addLayer: (layer: Layer) => void;
    removeLayer: (id: number) => void;
  };
}

const EXAMPLE_LAYER: Layer = {
  id: 3000,
  isHide: false,
  name: "레이어 1",
};

const useMemoStore = create<MemoStore>((set) => ({
  layerList: [EXAMPLE_LAYER],
  memoList: [],
  actions: {
    addLayer: (layer) =>
      set((state) => ({ layerList: [...state.layerList, layer] })),
    removeLayer: (id) =>
      set((state) => ({
        layerList: state.layerList.filter((layer) => layer.id !== id),
      })),
  },
}));

export const useLayerList = () => useMemoStore((state) => state.layerList);

export const useMemoActions = () => useMemoStore((state) => state.actions);
