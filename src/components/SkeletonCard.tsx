import classNames from "classnames";
import { CardType } from "./Card";

interface SkeletonCardProps {
  type: CardType;
}

export function SkeletonCard({ type }: SkeletonCardProps) {
  const isCircle = type === "artist";
  const isCategory = type === "category";
  const showText =
    type === "album" ||
    type === "artist" ||
    type === "playlist" ||
    type === "show" ||
    type === "audiobook";

  return (
    <div className="w-40 p-2 rounded-md animate-pulse">
      <div
        className={classNames("relative w-full bg-neutral-700 shadow-md", {
          "aspect-square rounded-full": isCircle,
          "aspect-square rounded-md": !isCircle,
        })}
      />

      {isCategory && (
        <>
          <div className="absolute bottom-0 left-0 h-[4px] w-full bg-gradient-to-r from-green-500 to-blue-500" />
          <div className="absolute bottom-2 left-2 right-2">
            <div className="h-4 bg-neutral-600 rounded w-3/4 mx-auto" />
          </div>
        </>
      )}

      {showText && (
        <div className={classNames("mt-2", { "text-center": isCircle })}>
          <div className="h-4 bg-neutral-600 rounded mx-auto mb-1" />
          {/* <div className="h-3 bg-neutral-700 rounded w-1/2 mx-auto" /> */}
        </div>
      )}
    </div>
  );
}
