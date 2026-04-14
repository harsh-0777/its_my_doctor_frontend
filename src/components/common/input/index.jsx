import { forwardRef, useId, useState } from "react";

// ─── Style maps ───────────────────────────────────────────────────────────────

const SIZES = {
  sm: "px-2.5 py-1.5 text-sm",
  md: "px-3 py-2 text-sm",
  lg: "px-4 py-3 text-base",
};

// ─── Eye icons (inline — no extra dep) ───────────────────────────────────────

const EyeIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7
         -1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const EyeOffIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7
         a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243
         M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29
         m7.532 7.532l3.29 3.29M3 3l18 18" />
  </svg>
);

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * Input
 *
 * @prop {string}    label               - field label
 * @prop {string}    name
 * @prop {string}    type                - text | email | password | number | search | tel | url
 * @prop {string}    placeholder
 * @prop {any}       value
 * @prop {Function}  onChange
 * @prop {Function}  onBlur
 * @prop {string}    error               - error message shown below
 * @prop {string}    hint                - helper text shown below (hidden when error present)
 * @prop {ReactNode} leftIcon            - icon inside left edge
 * @prop {ReactNode} rightIcon           - icon inside right edge
 * @prop {boolean}   showPasswordToggle  - adds eye toggle for type="password"
 * @prop {boolean}   disabled
 * @prop {boolean}   required
 * @prop {boolean}   readOnly
 * @prop {string}    size                - sm | md | lg
 * @prop {string}    className           - wrapper class
 * @prop {string}    inputClassName      - input element class
 */
const Input = forwardRef(function Input(
  {
    label,
    name,
    type = "text",
    placeholder,
    value,
    onChange,
    onBlur,
    error,
    hint,
    leftIcon,
    rightIcon,
    showPasswordToggle = false,
    disabled = false,
    required = false,
    readOnly = false,
    size = "md",
    className = "",
    inputClassName = "",
    ...rest
  },
  ref
) {
  const uid = useId();
  const [showPass, setShowPass] = useState(false);

  const resolvedType = type === "password" && showPass ? "text" : type;
  const hasRightSlot = rightIcon || (type === "password" && showPasswordToggle);
  const errorId = error ? `${uid}-error` : undefined;
  const hintId  = hint && !error ? `${uid}-hint` : undefined;

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {/* Label */}
      {label && (
        <label htmlFor={uid} className="text-sm font-medium text-gray-700">
          {label}
          {required && <span className="ml-1 text-red-500" aria-hidden="true">*</span>}
        </label>
      )}

      {/* Input wrapper */}
      <div className="relative">
        {/* Left icon */}
        {leftIcon && (
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {leftIcon}
          </span>
        )}

        <input
          ref={ref}
          id={uid}
          name={name}
          type={resolvedType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          required={required}
          readOnly={readOnly}
          aria-invalid={!!error}
          aria-describedby={[errorId, hintId].filter(Boolean).join(" ") || undefined}
          className={[
            "w-full rounded-lg border transition-colors duration-200",
            "focus:outline-none focus:ring-2 focus:ring-offset-0",
            "placeholder:text-gray-400",
            "disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400",
            "read-only:bg-gray-50 read-only:cursor-default",
            SIZES[size] ?? SIZES.md,
            leftIcon    ? "pl-10" : "",
            hasRightSlot ? "pr-10" : "",
            error
              ? "border-red-400 focus:border-red-400 focus:ring-red-300"
              : "border-gray-300 focus:border-blue-500 focus:ring-blue-300",
            inputClassName,
          ]
            .filter(Boolean)
            .join(" ")}
          {...rest}
        />

        {/* Right slot: custom icon or password toggle */}
        {hasRightSlot && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
            {type === "password" && showPasswordToggle ? (
              <button
                type="button"
                tabIndex={-1}
                onClick={() => setShowPass((p) => !p)}
                className="text-gray-400 hover:text-gray-600 focus:outline-none"
                aria-label={showPass ? "Hide password" : "Show password"}
              >
                {showPass ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            ) : (
              rightIcon
            )}
          </span>
        )}
      </div>

      {/* Error */}
      {error && (
        <p id={errorId} role="alert" className="text-xs text-red-500">
          {error}
        </p>
      )}

      {/* Hint */}
      {hint && !error && (
        <p id={hintId} className="text-xs text-gray-500">
          {hint}
        </p>
      )}
    </div>
  );
});

export default Input;
