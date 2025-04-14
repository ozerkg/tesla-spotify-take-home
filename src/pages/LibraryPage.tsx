import LibraryTabs from "../components/librarypage/LibraryTabs";
import LibraryTabContent from "../components/librarypage/LibraryTabContentV2";

const LibraryPage = () => {
  return (
    <div className="my-4">
      <div className="flex flex-row justify-center">
        <LibraryTabs />
      </div>
      <LibraryTabContent />
    </div>
  );
};

export default LibraryPage;
