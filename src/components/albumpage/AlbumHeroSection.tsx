interface AlbumHeroSectionProps {
  imageUrl: string;
  title: string;
  artistName: string;
  releaseDate?: string;
  totalTracks: number;
  duration: string;
}

const AlbumHeroSection = ({
  imageUrl,
  title,
  artistName,
  releaseDate,
  totalTracks,
  duration,
}: AlbumHeroSectionProps) => {
  return (
    <div className="relative bg-gradient-to-b to-[#1e2a35] from-black px-6 py-10 text-white">
      {/* Album Info Section */}
      <div className="flex flex-col md:flex-row items-center md:items-end gap-6">
        <img
          src={imageUrl}
          alt={title}
          className="w-44 h-44 md:w-60 md:h-60 object-cover rounded-md shadow-xl"
        />
        <div className="text-center md:text-left">
          <span className="uppercase text-xs tracking-wide text-neutral-400">
            Album
          </span>
          <h1 className="text-4xl md:text-6xl font-bold mt-2">{title}</h1>
          <p className="text-sm text-neutral-400 mt-2">
            {artistName} • {releaseDate} {" • "}
            {totalTracks} songs, {duration}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AlbumHeroSection;
