import classNames from "classnames";
import { twMerge } from "tailwind-merge";
import { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "icon";

interface SpotifyButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  rounded?: boolean;
  children: React.ReactNode;
}

export default function SpotifyButton({
  variant = "primary",
  rounded = false,
  children,
  className,
  ...rest
}: SpotifyButtonProps) {
  const classes = twMerge(
    classNames(
      "flex items-center justify-center font-medium cursor-pointer px-2 py-2 mx-2 transition duration-200 rounded-sm",
      {
        // Spotify green button
        "bg-[#1DB954] text-white hover:bg-[#1ed760]": variant === "primary",

        // Dark follow-style button
        "bg-neutral-800 text-neutral-400 hover:bg-neutral-600":
          variant === "secondary",

        // Bordered install-style button
        "border border-neutral-700 text-neutral-400 hover:text-white hover:bg-neutral-800":
          variant === "outline",

        // Transparent / ghost nav buttons
        "bg-transparent text-neutral-400 hover:text-white": variant === "ghost",

        // Icon buttons (e.g. play, shuffle)
        "w-10 h-10 p-0 text-white bg-[#1DB954] hover:bg-[#1ed760]":
          variant === "icon",
        "rounded-full": rounded || variant === "icon",
      },
      className
    )
  );

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
