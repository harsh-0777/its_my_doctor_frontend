import { forwardRef } from "react";

// ─── Style maps ───────────────────────────────────────────────────────────────

const VARIANTS = {
  primary:   "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
  secondary: "bg-gray-100 text-gray-800 hover:bg-gray-200 focus:ring-gray-400",
  danger:    "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
  success:   "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500",
  warning:   "bg-yellow-500 text-white hover:bg-yellow-600 focus:ring-yellow-400",
  ghost:     "bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-400",
  outline:   "border border-gray-300 bg-transparent text-gray-700 hover:bg-gray-50 focus:ring-gray-400",
  link:      "bg-transparent text-blue-600 hover:underline p-0 focus:ring-0 rounded-none",
};

const SIZES = {
  xs: "px-2 py-1 text-xs rounded",
  sm: "px-3 py-1.5 text-sm rounded-md",
  md: "px-4 py-2 text-sm rounded-lg",
  lg: "px-5 py-2.5 text-base rounded-lg",
  xl: "px-6 py-3 text-base rounded-xl",
};

// ─── Spinner ──────────────────────────────────────────────────────────────────

const Spinner = ({ size }) => {
  const dim = { xs: "h-3 w-3", sm: "h-3.5 w-3.5", md: "h-4 w-4", lg: "h-4 w-4", xl: "h-5 w-5" };
  return (
    <svg className={`animate-spin ${dim[size] ?? dim.md}`} fill="none" viewBox="0 0 24 24" aria-hidden="true">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  );
};

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * Button
 *
 * @prop {string}        variant     - primary | secondary | danger | success | warning | ghost | outline | link
 * @prop {string}        size        - xs | sm | md | lg | xl
 * @prop {boolean}       isLoading   - shows spinner and disables the button
 * @prop {string}        loadingText - text shown while loading (defaults to children)
 * @prop {boolean}       disabled
 * @prop {boolean}       fullWidth   - w-full
 * @prop {string}        type        - button | submit | reset
 * @prop {ReactNode}     leftIcon    - icon before label
 * @prop {ReactNode}     rightIcon   - icon after label
 * @prop {string}        className   - extra classes to merge
 */
const Button = forwardRef(function Button(
  {
    children,
    variant = "primary",
    size = "md",
    isLoading = false,
    loadingText,
    disabled = false,
    fullWidth = false,
    type = "button",
    leftIcon,
    rightIcon,
    className = "",
    onClick,
    ...rest
  },
  ref
) {
  const isDisabled = disabled || isLoading;

  return (
    <button
      ref={ref}
      type={type}
      disabled={isDisabled}
      onClick={onClick}
      aria-busy={isLoading}
      aria-disabled={isDisabled}
      className={[
        "inline-flex items-center justify-center gap-2 font-medium",
        "transition-colors duration-200",
        "focus:outline-none focus:ring-2 focus:ring-offset-2",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        VARIANTS[variant] ?? VARIANTS.primary,
        SIZES[size] ?? SIZES.md,
        fullWidth ? "w-full" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    >
      {isLoading && <Spinner size={size} />}
      {!isLoading && leftIcon && <span className="shrink-0">{leftIcon}</span>}
      <span>{isLoading && loadingText ? loadingText : children}</span>
      {!isLoading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
    </button>
  );
});

export default Button;
