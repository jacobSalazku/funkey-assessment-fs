import { cn } from "@/utils/tw-merge";
import { cva } from "class-variance-authority";
import { forwardRef } from "react";
import { type FieldError, type UseFormRegisterReturn } from "react-hook-form";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  label?: string;
  error?: FieldError;
  errorMessage?: string;
  register?: UseFormRegisterReturn;
  labelColor?: "default" | "light" | "danger";
  variant?: "default" | "error" | "dark" | "light";
};

const labelColorMap = {
  default: "text-gray-900",
  light: "text-white",
  danger: "text-red-500",
};

const inputVariants = cva(
  "w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 transition-colors disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "border-white bg-neutral-900 text-white placeholder-gray-400 focus:ring-white",
        light:
          "border-neutral-900 bg-white text-black placeholder-gray-500 focus:ring-blue-500",
        error:
          "border-red-500 bg-neutral-800 text-red-300 placeholder-red-400 focus:ring-red-500",
        dark: "border-orange-500 bg-neutral-900 text-white placeholder-gray-500 focus:ring-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      label,
      error,
      errorMessage,
      register,
      className,
      labelColor,
      variant = "default",
      ...props
    },
    ref,
  ) => {
    return (
      <div className="space-y-2">
        {label && (
          <label
            htmlFor={id}
            className={cn(
              labelColorMap[labelColor ?? "default"],
              "block text-sm font-medium",
            )}
          >
            {label}
          </label>
        )}
        <input
          id={id}
          className={cn(
            inputVariants({ variant: error ? "error" : variant }),
            className,
          )}
          {...(register ?? {})}
          {...props}
          ref={ref}
        />
        {error && errorMessage && (
          <p
            aria-errormessage={`${errorMessage}`}
            className="text-sm text-red-500"
          >
            {errorMessage}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export { Input };
