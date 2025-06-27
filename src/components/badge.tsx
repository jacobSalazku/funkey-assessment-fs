import { cn } from "@/utils/tw-merge";

type BadgeProps = {
  className?: string;
  label: string;
  color?: "gray" | "green" | "blue" | "transparent";
  children?: React.ReactNode;
};

const colorStyles = {
  transparent:
    "bg-transparent text-white border border-white hover:bg-white hover:text-black",
  gray: "bg-gray-200 text-gray-800 hover:bg-gray-300 hover:text-gray-900",
  green: "bg-green-200 text-green-800 hover:bg-green-300 hover:text-green-900",
  blue: "bg-blue-200 text-blue-800 hover:bg-blue-300 hover:text-blue-900",
};

export const Badge = ({
  className,
  label,
  color = "transparent",
  children,
}: BadgeProps) => {
  const capitalizedLabel =
    label.charAt(0).toUpperCase() + label.slice(1).toLowerCase();

  return (
    <span
      className={cn(
        "rounded-2xl px-4 py-1 font-light flex items-center",
        colorStyles[color],
        className,
      )}
    >
      {capitalizedLabel}
      {children}
    </span>
  );
};
