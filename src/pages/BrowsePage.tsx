import Card from "../components/Card";
import { useBrowseCategories } from "../apis/index";
import { SkeletonCard } from "../components/SkeletonCard";

const BrowsePage = () => {
  const { data: browseCategories, isPending, error } = useBrowseCategories(30);

  if (error) {
    return <>Error loading categroies</>;
  }

  const renderedBrowseCategories = isPending
    ? Array.from({ length: 16 }).map((_, i) => (
        <SkeletonCard key={i} type="category" />
      ))
    : browseCategories.map((category) => {
        return (
          <Card
            type={"category"}
            imageUrl={category.icons[0].url}
            title={category.name}
            key={category.id}
          />
        );
      });

  return (
    <div className="p-3">
      <h2 className="px-3 font-bold">Browse all</h2>
      <div className="flex flex-row flex-wrap">{renderedBrowseCategories}</div>
    </div>
  );
};

export default BrowsePage;
