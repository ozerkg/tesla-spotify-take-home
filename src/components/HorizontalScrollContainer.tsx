import React from "react";

interface HorizontalScrollContainerProps {
  children: React.ReactNode;
  snap?: boolean;
  className?: string;
}

const HorizontalScrollContainer: React.FC<HorizontalScrollContainerProps> = ({
  children,
  snap = true,
  className = "",
}) => {
  return (
    <div
      className={`flex overflow-x-auto hide-scrollbar space-x-4 px-4 py-2 ${className}`}
      style={{
        WebkitOverflowScrolling: "touch",
        scrollSnapType: snap ? "x mandatory" : "none",
      }}
    >
      {React.Children.map(children, (child, index) => (
        <div
          key={index}
          className="flex-shrink-0"
          style={{
            minWidth: "160px",
            scrollSnapAlign: snap ? "start" : "none",
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
};

export default HorizontalScrollContainer;
