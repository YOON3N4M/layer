import { IconAddFile, IconPencilePlus, IconPlus } from "./svg";

interface CreateMemoButtonProps {}

function CreateMemoButton(props: CreateMemoButtonProps) {
  const {} = props;

  return (
    <button className="group fixed right-[5%] bottom-[10%] z-craete bg-white rounded-full p-xl hover:bg-slate-200 transition-colors">
      <span className="opacity-40 group-hover:text-black text-xl">
        <IconPencilePlus />
      </span>
    </button>
  );
}

export default CreateMemoButton;
