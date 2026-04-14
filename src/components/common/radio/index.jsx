import { useId } from "react";

const SIZES = {
  sm: { dot: "h-3.5 w-3.5", label: "text-sm" },
  md: { dot: "h-4 w-4",     label: "text-sm" },
  lg: { dot: "h-5 w-5",     label: "text-base" },
};

// ─── Single Radio ─────────────────────────────────────────────────────────────

const RadioOption = ({ option, name, value, onChange, disabled, size, color }) => {
  const uid = useId();
  const s   = SIZES[size] ?? SIZES.md;
  const isChecked = value === option.value;
  const isDisabled = disabled || option.disabled;

  return (
    <label
      htmlFor={uid}
      className={[
        "flex items-center gap-2",
        isDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
      ].join(" ")}
    >
      <input
        type="radio"
        id={uid}
        name={name}
        value={option.value}
        checked={isChecked}
        onChange={onChange}
        disabled={isDisabled}
        className={[
          s.dot,
          "border-gray-300 transition-colors duration-150",
          "focus:ring-2 focus:ring-offset-1 focus:ring-blue-500",
          "disabled:cursor-not-allowed",
          color,
        ].join(" ")}
      />
      <span className={`${s.label} font-medium text-gray-700 select-none`}>
        {option.label}
      </span>
    </label>
  );
};

// ─── RadioGroup ───────────────────────────────────────────────────────────────

/**
 * RadioGroup
 *
 * @prop {string}   label        - group label
 * @prop {string}   name         - shared name for all radios
 * @prop {Array}    options       - [{ value, label, disabled? }]
 * @prop {string}   value        - controlled selected value
 * @prop {Function} onChange     - (event) => void
 * @prop {boolean}  disabled     - disables all options
 * @prop {string}   orientation  - horizontal | vertical  (default: vertical)
 * @prop {string}   size         - sm | md | lg
 * @prop {string}   color        - accent color class (default: accent-blue-600)
 * @prop {string}   error
 * @prop {string}   hint
 * @prop {boolean}  required
 * @prop {string}   className    - wrapper class
 */
const RadioGroup = ({
  label,
  name,
  options = [],
  value,
  onChange,
  disabled = false,
  orientation = "vertical",
  size = "md",
  color = "accent-blue-600",
  error,
  hint,
  required = false,
  className = "",
}) => {
  return (
    <fieldset className={`flex flex-col gap-2 ${className}`}>
      {label && (
        <legend className="text-sm font-medium text-gray-700">
          {label}
          {required && <span className="ml-1 text-red-500" aria-hidden="true">*</span>}
        </legend>
      )}

      <div
        className={[
          "flex gap-3",
          orientation === "horizontal" ? "flex-row flex-wrap" : "flex-col",
        ].join(" ")}
        role="radiogroup"
        aria-invalid={!!error}
      >
        {options.map((opt) => (
          <RadioOption
            key={opt.value}
            option={opt}
            name={name}
            value={value}
            onChange={onChange}
            disabled={disabled}
            size={size}
            color={color}
          />
        ))}
      </div>

      {error && <p role="alert" className="text-xs text-red-500">{error}</p>}
      {hint && !error && <p className="text-xs text-gray-500">{hint}</p>}
    </fieldset>
  );
};

export default RadioGroup;
