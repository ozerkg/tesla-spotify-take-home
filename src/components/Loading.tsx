const LoadingFallback = ({ message = "Loading..." }: { message?: string }) => {
  return (
    <div className="w-full h-full flex items-center justify-center py-12 text-neutral-400 text-lg">
      <span>{message}</span>
    </div>
  );
};

export default LoadingFallback;
