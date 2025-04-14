import { useNavigate, useSearchParams } from "react-router-dom";
import Card, { CardType } from "../Card";
import { useLibraryTabData } from "../../hooks/useLibraryTabData";
import { normalizeItem } from "../../utils/normalizeItem";
import { SkeletonCard } from "../SkeletonCard";
import { usePrefetchDetailPage } from "../../hooks/usePrefetchDetailPage";

const LibraryTabContent = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const selectedTab = searchParams.get("tab") || "Playlists";
  const { data = [], isPending } = useLibraryTabData(selectedTab);
  const prefetchDetail = usePrefetchDetailPage();

  const onCardClick = (id: string) => {
    const routeMap: Record<string, string> = {
      Artists: "artist",
      Albums: "album",
      Playlists: "playlist",
    };

    const routePrefix = routeMap[selectedTab];
    if (routePrefix) navigate(`/${routePrefix}/${id}`);
  };

  return (
    <div className="p-3">
      <h1 className="px-2 text-3xl text-neutral-200 my-6">{selectedTab}</h1>
      <div className="flex flex-row flex-wrap">
        {isPending
          ? Array.from({ length: 16 }).map((_, i) => (
              <SkeletonCard key={i} type={"playlist"} />
            ))
          : data.map((item) => {
              const card = normalizeItem(item);
              return (
                <Card
                  key={card.id}
                  type={card.type as CardType}
                  title={card.title}
                  imageUrl={card.imageUrl}
                  onClick={() => onCardClick(card.id)}
                  onMouseEnter={() => prefetchDetail(selectedTab, card.id)}
                  onFocus={() => prefetchDetail(selectedTab, card.id)}
                  onTouchStart={() => prefetchDetail(selectedTab, card.id)}
                />
              );
            })}
      </div>
    </div>
  );
};

export default LibraryTabContent;
