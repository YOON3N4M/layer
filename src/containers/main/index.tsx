"use client";

import LoadingSpinner from "@/components/LoadingSpinner";
import TestModal from "@/components/modal/modalElements/TestModal";
import useModal from "@/components/modal/useModal";
import useToast from "@/components/toast/useToast";

interface MainContainerProps {}

function MainContainer(props: MainContainerProps) {
  const {} = props;

  const { addToast } = useToast();
  const { addModalElement } = useModal();

  function onClickToast() {
    addToast({ message: "테스트 토스트" });
  }

  function onClickModal() {
    addModalElement(<TestModal />);
  }

  return (
    <main className="p-md">
      <h2>모달/토스트 테스트</h2>
      <div className="flex gap-md mt-sm">
        <button
          className="px-xs py-xxs border bg-slate-100 rounded-md"
          onClick={onClickModal}
        >
          모달
        </button>
        <button
          className="px-xs py-xxs border bg-slate-100 rounded-md"
          onClick={onClickToast}
        >
          토스트
        </button>
      </div>
      <h2 className="mt-lg">로딩 스피너 테스트</h2>
      <div className="flex mt-xs">
        <div className="size-[500px]">
          <div className="p-md border size-[500px] bg-black absolute">
            <h1 className="text-white text-[50px]">안녕하세요</h1>
            <LoadingSpinner white absolute />
          </div>
        </div>
        <div className="relative p-md border size-[500px] bg-black">
          <LoadingSpinner white absolute />
        </div>
      </div>
    </main>
  );
}

export default MainContainer;
