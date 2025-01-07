import { MemoPosition } from "@/types";
import { MotionValue, useMotionValue } from "motion/react";
import { create } from "zustand";

interface MotionPosition {
  x: MotionValue | null;
  y: MotionValue | null;
}

interface LayerContainerStore {
  selectedLayerId: number | null;
  scale: number;
  stagePosition: MotionPosition;
  actions: {
    setScale: (value: number) => void;
    setStagePosition: (value: MotionPosition) => void;
    setSelectedLayerId: (id: number | null) => void;
  };
}

const useLayerContainerStore = create<LayerContainerStore>((set) => ({
  selectedLayerId: null,
  scale: 1,
  stagePosition: { x: null, y: null },
  actions: {
    setScale: (scale) => set({ scale }),
    setStagePosition: (position) => set({ stagePosition: position }),
    setSelectedLayerId: (selectedLayerId) => set({ selectedLayerId }),
  },
}));

export const useScale = () => useLayerContainerStore((state) => state.scale);

export const useStagePosition = () =>
  useLayerContainerStore((state) => state.stagePosition);

export const useSelectedLayerId = () =>
  useLayerContainerStore((state) => state.selectedLayerId);

export const useLayerContainerActions = () =>
  useLayerContainerStore((state) => state.actions);
