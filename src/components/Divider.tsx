import classNames from "classnames";

interface DividerProps {
  direction?: "horizontal" | "vertical";
  className?: string;
}

export default function Divider({
  direction = "horizontal",
  className,
}: DividerProps) {
  const baseClasses = classNames(
    direction === "vertical" ? "w-px h-6" : "h-px w-full",
    "bg-neutral-600 opacity-60 rounded-md"
  );

  return (
    <div className="flex justify-center items-center">
      <div className={classNames(baseClasses, className)} />
    </div>
  );
}
