import GoodMorning from "../../data/GoodMorning.json";
import { useNavigate } from "react-router-dom";
import { usePrefetchDetailPage } from "../../hooks/usePrefetchDetailPage";

const GreetingSection = () => {
  const navigate = useNavigate();
  const prefetchQuery = usePrefetchDetailPage();

  const handleNavigate = (id: string, type: string) => {
    if (type === "liked") return navigate(`/collection/tracks`);

    return navigate(`/${type}/${id}`);
  };

  return (
    <>
      <h1 className="px-2 text-3xl font-bold">Good Afternoon</h1>
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-3 my-6">
        {GoodMorning.map((item) => {
          return (
            <div
              key={item.id}
              onClick={() => handleNavigate(item.id, item.type)}
              onMouseEnter={() => prefetchQuery(item.type, item.id)}
              onFocus={() => prefetchQuery(item.type, item.id)}
              onTouchStart={() => prefetchQuery(item.type, item.id)}
              className="flex items-center bg-neutral-800 rounded-md overflow-hidden hover:bg-neutral-700 transition cursor-pointer w-full h-16"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-14 h-[64px] object-cover"
              />
              <span className="text-white text-sm font-semibold ml-4 truncate">
                {item.title}
              </span>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default GreetingSection;
