import { create } from "zustand";

interface LayerContainerStore {
  selectedLayerId: number | null;
  actions: {
    setSelectedLayerId: (id: number | null) => void;
  };
}

const useLayerContainerStore = create<LayerContainerStore>((set) => ({
  selectedLayerId: null,
  actions: {
    setSelectedLayerId: (selectedLayerId) => set({ selectedLayerId }),
  },
}));

export const useSelectedLayerId = () =>
  useLayerContainerStore((state) => state.selectedLayerId);

export const useLayerContainerActions = () =>
  useLayerContainerStore((state) => state.actions);
