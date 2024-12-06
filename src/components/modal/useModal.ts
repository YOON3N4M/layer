import { useModalActions } from "./store";
import { useModalElements } from "./store";
import { ModalElement } from "./store";

export default function useModal() {
  const modalElements = useModalElements();
  const { setIsModalOn, setModalElements } = useModalActions();

  //단독 모달
  function openSingleModal(modalEl: ModalElement) {
    setIsModalOn(true);
    setModalElements([modalEl]);
  }

  function closeAllModal() {
    setIsModalOn(false);
    setModalElements([]);
  }
  /**
   * 중첩모달을 위한 modal element추가 메서드
   */
  function addModalElement(modalEl: ModalElement) {
    setModalElements([...modalElements, modalEl]);
  }

  /**
   * 중첩된 모달을 마지막 모달부터 제거(종료)하는 메서드
   */
  function removeModalElement() {
    const removed = modalElements.slice(0, -1);
    setModalElements(removed);
  }

  return {
    openSingleModal,
    addModalElement,
    closeAllModal,
    removeModalElement,
  };
}
