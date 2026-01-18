import Link from "next/link";

type ButtonStyle = "gold" | "red";

interface ButtonProps {
  text: string;
  link?: string;
  buttonStyle?: ButtonStyle;
  onClick?: (e: React.MouseEvent) => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  className?: string;
}

export default function Button({
  text,
  link,
  buttonStyle = "red",
  onClick,
  disabled = false,
  type = "button",
  className = "",
}: ButtonProps) {
  const backgroundImage =
    buttonStyle === "gold"
      ? "url('/data/img/gold-button.webp')"
      : "url('/data/img/red-button.webp')";

  const textGradient =
    buttonStyle === "gold"
      ? "linear-gradient(180deg, #2d2d2d, #4a4a4a 72.17%, #666)"
      : "linear-gradient(180deg, #bcb641, #fff4b4 72.17%, #fff)";

  const buttonContent = (
    <span
      className="relative z-10 text-xl font-bold font-cinzel-decorative drop-shadow-lg"
      style={{
        background: textGradient,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      }}
    >
      {text}
    </span>
  );

  const baseClassName = `relative h-16 w-full max-w-[400px] overflow-hidden bg-center bg-no-repeat bg-contain transition-transform hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50 flex items-center justify-center ${className}`;

  if (link) {
    return (
      <Link
        href={link}
        className={baseClassName}
        style={{ backgroundImage }}
        onClick={onClick}
      >
        {buttonContent}
      </Link>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={baseClassName}
      style={{ backgroundImage }}
    >
      {buttonContent}
    </button>
  );
}
