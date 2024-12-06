"use client";

import { useEffect } from "react";
import { IconXSign } from "../svg";
import { Toast, useToastList } from "./store";
import useToast from "./useToast";

const TOAST_DURATION = 5000;

export default function ToastPortal() {
  const toastList = useToastList();

  return (
    <div id="toast-portal">
      <div className="fixed bottom-[2%] left-[3%] flex flex-col gap-sm z-[400]">
        {toastList.map((toast, idx) => (
          <ToastItem key={`${toast.id}-toast`} toast={toast} />
        ))}
      </div>
    </div>
  );
}

function ToastItem({ toast }: { toast: Toast }) {
  const { message, id } = toast;

  const { removeToast } = useToast();

  useEffect(() => {
    setTimeout(() => {
      removeToast(id!);
    }, TOAST_DURATION);
  }, []);

  return (
    <div className="py-sm px-md bg-black text-white text-sm rounded-md animate-fadeIn border flex gap-sm items-center">
      <p>{message}</p>
      <button onClick={() => removeToast(id!)}>
        <IconXSign />
      </button>
    </div>
  );
}
