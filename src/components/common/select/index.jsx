import { forwardRef, useId } from "react";

const SIZES = {
  sm: "px-2.5 py-1.5 text-sm",
  md: "px-3 py-2 text-sm",
  lg: "px-4 py-3 text-base",
};

const ChevronIcon = () => (
  <svg className="h-4 w-4 text-gray-400 pointer-events-none" fill="none"
    stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

/**
 * Select
 *
 * @prop {string}        label         - field label
 * @prop {string}        name
 * @prop {Array}         options        - [{ value, label, disabled? }]
 * @prop {Array}         groups         - [{ label, options: [{ value, label }] }] — for optgroup
 * @prop {string}        value
 * @prop {Function}      onChange
 * @prop {Function}      onBlur
 * @prop {string}        placeholder   - default empty option label
 * @prop {string}        error
 * @prop {string}        hint
 * @prop {boolean}       disabled
 * @prop {boolean}       required
 * @prop {string}        size          - sm | md | lg
 * @prop {string}        className     - wrapper class
 * @prop {string}        selectClassName
 */
const Select = forwardRef(function Select(
  {
    label,
    name,
    options = [],
    groups = [],
    value,
    onChange,
    onBlur,
    placeholder = "Select an option",
    error,
    hint,
    disabled = false,
    required = false,
    size = "md",
    className = "",
    selectClassName = "",
    ...rest
  },
  ref
) {
  const uid    = useId();
  const errorId = error ? `${uid}-error` : undefined;
  const hintId  = hint && !error ? `${uid}-hint` : undefined;
  const hasGroups = groups.length > 0;

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label htmlFor={uid} className="text-sm font-medium text-gray-700">
          {label}
          {required && <span className="ml-1 text-red-500" aria-hidden="true">*</span>}
        </label>
      )}

      <div className="relative">
        <select
          ref={ref}
          id={uid}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          required={required}
          aria-invalid={!!error}
          aria-describedby={[errorId, hintId].filter(Boolean).join(" ") || undefined}
          className={[
            "w-full appearance-none rounded-lg border transition-colors duration-200",
            "focus:outline-none focus:ring-2 focus:ring-offset-0",
            "disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400",
            "pr-9",                    // space for chevron
            SIZES[size] ?? SIZES.md,
            error
              ? "border-red-400 focus:border-red-400 focus:ring-red-300"
              : "border-gray-300 focus:border-blue-500 focus:ring-blue-300",
            selectClassName,
          ]
            .filter(Boolean)
            .join(" ")}
          {...rest}
        >
          {/* Placeholder */}
          <option value="" disabled>
            {placeholder}
          </option>

          {/* Flat options */}
          {!hasGroups &&
            options.map((opt) => (
              <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                {opt.label}
              </option>
            ))}

          {/* Grouped options */}
          {hasGroups &&
            groups.map((group) => (
              <optgroup key={group.label} label={group.label}>
                {group.options.map((opt) => (
                  <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                    {opt.label}
                  </option>
                ))}
              </optgroup>
            ))}
        </select>

        {/* Chevron */}
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
          <ChevronIcon />
        </span>
      </div>

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

export default Select;
