export type CardType =
  | "album"
  | "playlist"
  | "artist"
  | "song"
  | "category"
  | "audiobook"
  | "show";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  type: CardType;
  imageUrl: string;
  title: string;
  subtitle?: string;
}

function Card({ type, imageUrl, title, subtitle, ...rest }: CardProps) {
  const isArtist = type === "artist";
  const isCategory = type === "category";
  const showText =
    type === "album" ||
    type === "artist" ||
    type === "playlist" ||
    type === "show" ||
    type === "audiobook";

  return (
    <div
      className="w-40 cursor-pointer hover:bg-neutral-800/50 p-2 rounded-md transition"
      {...rest}
    >
      <div
        className={`relative w-full overflow-hidden shadow-md aspect-square ${
          isArtist ? "rounded-full" : "rounded-md"
        }`}
      >
        <img
          src={imageUrl}
          alt={title}
          className="object-cover w-full h-full"
        />

        {isCategory && (
          <>
            <div className="absolute bottom-0 left-0 h-[4px] w-full bg-gradient-to-r from-green-500 to-blue-500" />
            <div className="absolute bottom-2 left-2 right-2">
              <h3 className="text-white text-sm font-bold drop-shadow-md">
                {title}
              </h3>
            </div>
          </>
        )}
      </div>

      {showText && (
        <div className="mt-2">
          <h3
            className={`text-sm font-semibold text-white truncate ${
              isArtist ? "text-center" : ""
            }`}
          >
            {title}
          </h3>
          {subtitle && (
            <p
              className={`text-xs text-neutral-400 truncate ${
                isArtist ? "text-center" : ""
              }`}
            >
              {subtitle}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default Card;
