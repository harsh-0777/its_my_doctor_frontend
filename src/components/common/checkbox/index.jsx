import { forwardRef, useId } from "react";

const SIZES = {
  sm: { box: "h-3.5 w-3.5", label: "text-sm" },
  md: { box: "h-4 w-4",     label: "text-sm" },
  lg: { box: "h-5 w-5",     label: "text-base" },
};

/**
 * Checkbox
 *
 * @prop {string}    label         - label text
 * @prop {string}    name
 * @prop {boolean}   checked
 * @prop {Function}  onChange
 * @prop {boolean}   indeterminate - shows "−" state (for select-all patterns)
 * @prop {boolean}   disabled
 * @prop {string}    error
 * @prop {string}    hint
 * @prop {string}    size          - sm | md | lg
 * @prop {string}    color         - accent color class (default: accent-blue-600)
 * @prop {string}    className     - wrapper class
 */
const Checkbox = forwardRef(function Checkbox(
  {
    label,
    name,
    checked = false,
    onChange,
    indeterminate = false,
    disabled = false,
    error,
    hint,
    size = "md",
    color = "accent-blue-600",
    className = "",
    ...rest
  },
  ref
) {
  const uid = useId();
  const s   = SIZES[size] ?? SIZES.md;

  // Attach indeterminate imperatively (not a real HTML attribute)
  const setRef = (el) => {
    if (el) el.indeterminate = indeterminate;
    if (typeof ref === "function") ref(el);
    else if (ref) ref.current = el;
  };

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <label
        htmlFor={uid}
        className={[
          "flex items-center gap-2",
          disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
        ].join(" ")}
      >
        <input
          ref={setRef}
          type="checkbox"
          id={uid}
          name={name}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          aria-invalid={!!error}
          className={[
            s.box,
            "rounded border-gray-300 transition-colors duration-150",
            "focus:ring-2 focus:ring-blue-500 focus:ring-offset-1",
            "disabled:cursor-not-allowed",
            color,
          ].join(" ")}
          {...rest}
        />
        {label && (
          <span className={`${s.label} font-medium text-gray-700 select-none`}>
            {label}
          </span>
        )}
      </label>

      {error && <p role="alert" className="ml-6 text-xs text-red-500">{error}</p>}
      {hint && !error && <p className="ml-6 text-xs text-gray-500">{hint}</p>}
    </div>
  );
});

export default Checkbox;
