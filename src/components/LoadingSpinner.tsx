import { cn } from "@/utils";

interface LoadingSpinnerProps {
  className?: string;
  container?: boolean;
  absolute?: boolean;
  white?: boolean;
}

export default function LoadingSpinner(props: LoadingSpinnerProps) {
  const {
    container = false,
    className,
    absolute = false,
    white = false,
  } = props;

  const renderSpinner = () => (
    <div
      className={cn(
        className,
        absolute && "absolute !mt-0 center",
        "flex size-full items-center justify-center"
      )}
    >
      <div
        className={cn(
          "shadow-lg inline-block h-8 w-8 animate-spin rounded-full border-2 border-solid border-black border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]",
          white && "border-white"
        )}
        role="status"
      >
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Loading...
        </span>
      </div>
    </div>
  );

  if (container) {
    return (
      <div className="flex min-h-[100vh] items-center inner">
        {renderSpinner()}
      </div>
    );
  }

  return renderSpinner();
}
