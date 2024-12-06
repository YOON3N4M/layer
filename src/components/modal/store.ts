import { create } from "zustand";

export type ModalElement = React.JSX.Element | JSX.Element;

interface ModalStore {
  modalElements: ModalElement[];
  isModalOn: boolean;
  actions: {
    setModalElements: (modalElement: ModalElement[]) => void;
    setIsModalOn: (bool: boolean) => void;
  };
}

const useModalStore = create<ModalStore>((set) => ({
  modalElements: [],
  isModalOn: false,
  actions: {
    setModalElements: (modalElements) => set({ modalElements }),
    setIsModalOn: (bool) => set({ isModalOn: bool }),
  },
}));

// export const useIsScriptLoad = () => useMapStore((state) => state.isScriptLoad)
export const useModalElements = () =>
  useModalStore((state) => state.modalElements);
export const useIsModalOn = () => useModalStore((state) => state.isModalOn);

export const useModalActions = () => useModalStore((state) => state.actions);
