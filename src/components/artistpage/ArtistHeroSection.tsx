interface ArtisHeroSectionProps {
  imgUrl: string;
  artistName: string;
}

const ArtisHeroSection = ({ imgUrl, artistName }: ArtisHeroSectionProps) => {
  return (
    <div className="relative h-[300px] text-white">
      <img
        src={imgUrl}
        alt={artistName}
        className="absolute inset-0 w-full h-full object-cover brightness-50 md:blur-0"
        style={{ objectPosition: "center 25%" }}
      />
      <div className="absolute bottom-6 left-6 z-10">
        <p className="uppercase text-xs text-neutral-300 tracking-widest mb-2">
          Artist
        </p>
        <h1 className="text-4xl md:text-5xl font-bold">{artistName}</h1>
      </div>
    </div>
  );
};

export default ArtisHeroSection;
