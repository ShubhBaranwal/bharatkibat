"use client";

import { cn } from "@/app/lib/utils";
import { forwardRef, InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

// ------------------------------
// 🌟 TYPE DEFINITIONS
// ------------------------------
type BaseProps = {
  label?: string;
  error?: string;
  hint?: string;
  wrapperClass?: string;
  labelClass?: string;
};

type TextProps = BaseProps &
  InputHTMLAttributes<HTMLInputElement> & {
    type?: "text" | "password" | "email" | "number";
    fieldType?: "input";
  };

type TextareaProps = BaseProps &
  TextareaHTMLAttributes<HTMLTextAreaElement> & {
    fieldType: "textarea";
    rows?: number;
  };

type SelectProps = BaseProps &
  SelectHTMLAttributes<HTMLSelectElement> & {
    fieldType: "select";
    options: { label: string; value: string | number }[];
  };

type InputFieldProps = TextProps | TextareaProps | SelectProps;

// ------------------------------
// 🌟 COMPONENT
// ------------------------------
export const InputField = forwardRef<
  HTMLInputElement & HTMLTextAreaElement & HTMLSelectElement,
  InputFieldProps
>(({ label, error, hint, wrapperClass, labelClass, fieldType = "input", ...props }, ref) => {
  return (
    <div className={cn("w-full flex flex-col gap-1", wrapperClass)}>
      {/* LABEL */}
      {label && (
        <label className={cn("text-sm font-medium text-gray-700", labelClass)}>
          {label}
        </label>
      )}

      {/* INPUT FIELD LOGIC */}
      {fieldType === "textarea" ? (
        <textarea
          ref={ref as any}
          {...(props as TextareaProps)}
          className={twMerge(
            "w-full rounded-lg border px-3 py-2 text-sm bg-white",
            error ? "border-red-500" : "border-gray-300 focus:border-blue-500",
            "focus:outline-none focus:ring-2 focus:ring-blue-200",
            props.className
          )}
        />
      ) : fieldType === "select" ? (
        <select
          ref={ref as any}
          {...(props as SelectProps)}
          className={twMerge(
            "w-full rounded-lg border px-3 py-2 text-sm bg-white",
            error ? "border-red-500" : "border-gray-300 focus:border-blue-500",
            "focus:outline-none focus:ring-2 focus:ring-blue-200",
            props.className
          )}
        >
          <option value="">-- Select --</option>
          {(props as SelectProps).options?.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          ref={ref as any}
          {...(props as TextProps)}
          className={twMerge(
            "w-full rounded-lg border px-3 py-2 text-sm bg-white",
            error ? "border-red-500" : "border-gray-300 focus:border-blue-500",
            "focus:outline-none focus:ring-2 focus:ring-blue-200",
            props.className
          )}
        />
      )}

      {/* HINT MESSAGE */}
      {hint && !error && <p className="text-xs text-gray-500">{hint}</p>}

      {/* ERROR MESSAGE */}
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
});

InputField.displayName = "InputField";
