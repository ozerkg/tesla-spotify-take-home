import { GoSearch } from "react-icons/go";

interface SearchProps {
  mode?: "mobile" | "desktop";
  expanded?: boolean;
  setExpanded?: (val: boolean) => void;
}

export default function Search({
  mode = "desktop",
  expanded,
  setExpanded,
}: SearchProps) {
  if (mode === "mobile") {
    return (
      <input
        type="text"
        placeholder="Search"
        className="w-full bg-neutral-800 text-white placeholder-neutral-400 rounded-full px-3 py-2 text-sm"
      />
    );
  }

  return (
    <div
      className={`flex items-center rounded-full px-3 mr-2 transition-all duration-300 ${
        expanded ? "w-64 bg-neutral-800 h-8 " : "w-10"
      }`}
    >
      <button
        aria-label="Search"
        onClick={() => setExpanded?.(!expanded)}
        className="text-white"
      >
        <GoSearch size={18} />
      </button>

      {expanded && (
        <input
          type="text"
          placeholder="Search"
          className="ml-2 bg-transparent text-white placeholder-neutral-400 text-sm w-full outline-none"
        />
      )}
    </div>
  );
}
