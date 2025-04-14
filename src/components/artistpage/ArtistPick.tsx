interface ArtistPickProps {
  imgUrl: string;
  artistName: string;
  trackName: string;
}

const ArtistPick = ({ imgUrl, artistName, trackName }: ArtistPickProps) => {
  return (
    <div className="w-full md:w-1/3">
      <h3 className="text-xl font-semibold mb-4">Artist Pick</h3>
      <div className="flex gap-4">
        <img
          src={imgUrl}
          alt="Starboy"
          className="w-[182px] h-[182px] rounded-md object-cover"
        />
        <div className="flex flex-col justify-center">
          <p className="text-sm text-neutral-400">{artistName}</p>
          <p className="text-lg font-medium">{trackName}</p>
          <span className="text-sm text-neutral-400">Song</span>
        </div>
      </div>
    </div>
  );
};

export default ArtistPick;
