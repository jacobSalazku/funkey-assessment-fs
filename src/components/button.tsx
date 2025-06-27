import { cn } from "@/utils/tw-merge";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type ButtonHTMLAttributes } from "react";

const buttonVariants = cva(
  "inline-flex items-center py-4 justify-center gap-2 whitespace-nowrap rounded-md text-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:opacity-50 cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "w-full bg-neutral-900 cursor-pointer text-white font-semibold py-2 rounded-md hover:bg-neutral-700 transition disabled:opacity-50",
        primary: "bg-gray-800 text-white hover:bg-blue-900 2",
        outline:
          "text-black transition-all duration-200 ease-in-out hover:text-white hover:bg-neutral-900 hover:shadow-md px-4 py-2 rounded",
        danger: "text-white shadow-sm bg-red-800 hover:bg-red-900",
        link: "text-white hover:underline underline-offset-4",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-2 text-xs",
        lg: "h-10 rounded-md px-8",
        full: "h-10 w-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    icon?: React.ReactNode;
  };

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, type = "button", variant, size, children, ...props }, ref) => {
    return (
      <button
        type={type}
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";

export { Button, buttonVariants };
