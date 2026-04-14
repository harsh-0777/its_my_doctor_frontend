import { forwardRef, useId } from "react";

const SIZES = {
  sm: "px-2.5 py-1.5 text-sm",
  md: "px-3 py-2 text-sm",
  lg: "px-4 py-3 text-base",
};

/**
 * Textarea
 *
 * @prop {string}    label         - field label
 * @prop {string}    name
 * @prop {string}    placeholder
 * @prop {string}    value
 * @prop {Function}  onChange
 * @prop {Function}  onBlur
 * @prop {string}    error         - error message
 * @prop {string}    hint          - helper text
 * @prop {number}    rows          - visible row count (default 4)
 * @prop {number}    maxLength     - character limit
 * @prop {boolean}   showCount     - show char counter when maxLength set
 * @prop {boolean}   resize        - allow manual resize (default false)
 * @prop {boolean}   disabled
 * @prop {boolean}   required
 * @prop {boolean}   readOnly
 * @prop {string}    size          - sm | md | lg
 * @prop {string}    className     - wrapper class
 * @prop {string}    textareaClassName
 */
const Textarea = forwardRef(function Textarea(
  {
    label,
    name,
    placeholder,
    value = "",
    onChange,
    onBlur,
    error,
    hint,
    rows = 4,
    maxLength,
    showCount = false,
    resize = false,
    disabled = false,
    required = false,
    readOnly = false,
    size = "md",
    className = "",
    textareaClassName = "",
    ...rest
  },
  ref
) {
  const uid    = useId();
  const errorId = error ? `${uid}-error` : undefined;
  const hintId  = hint && !error ? `${uid}-hint` : undefined;
  const charCount = typeof value === "string" ? value.length : 0;

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {/* Label + counter */}
      <div className="flex items-center justify-between">
        {label && (
          <label htmlFor={uid} className="text-sm font-medium text-gray-700">
            {label}
            {required && <span className="ml-1 text-red-500" aria-hidden="true">*</span>}
          </label>
        )}
        {showCount && maxLength && (
          <span className={`text-xs ${charCount >= maxLength ? "text-red-500" : "text-gray-400"}`}>
            {charCount}/{maxLength}
          </span>
        )}
      </div>

      <textarea
        ref={ref}
        id={uid}
        name={name}
        rows={rows}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        required={required}
        readOnly={readOnly}
        maxLength={maxLength}
        aria-invalid={!!error}
        aria-describedby={[errorId, hintId].filter(Boolean).join(" ") || undefined}
        className={[
          "w-full rounded-lg border transition-colors duration-200",
          "focus:outline-none focus:ring-2 focus:ring-offset-0",
          "placeholder:text-gray-400",
          "disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400",
          "read-only:bg-gray-50 read-only:cursor-default",
          resize ? "resize-y" : "resize-none",
          SIZES[size] ?? SIZES.md,
          error
            ? "border-red-400 focus:border-red-400 focus:ring-red-300"
            : "border-gray-300 focus:border-blue-500 focus:ring-blue-300",
          textareaClassName,
        ]
          .filter(Boolean)
          .join(" ")}
        {...rest}
      />

      {error && (
        <p id={errorId} role="alert" className="text-xs text-red-500">
          {error}
        </p>
      )}
      {hint && !error && (
        <p id={hintId} className="text-xs text-gray-500">
          {hint}
        </p>
      )}
    </div>
  );
});

export default Textarea;
