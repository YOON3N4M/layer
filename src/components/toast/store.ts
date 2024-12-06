import { create } from "zustand";

export interface Toast {
  id?: number;
  message: string;
  status?: "success" | "warn" | "error";
  position?: "bottom-left";
}

interface ToastStore {
  toastList: Toast[];
  actions: {
    setToastList: (toast: Toast[]) => void;
  };
}

const useToastStore = create<ToastStore>((set) => ({
  toastList: [],
  actions: {
    setToastList: (toastList) => set({ toastList }),
  },
}));

export const useToastList = () => useToastStore((state) => state.toastList);
export const useToastActions = () => useToastStore((state) => state.actions);
