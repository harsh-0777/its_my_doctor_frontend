import { useId } from "react";

const SIZES = {
  sm: { track: "h-4 w-8",  thumb: "h-3 w-3",  translate: "translate-x-4" },
  md: { track: "h-5 w-10", thumb: "h-4 w-4",  translate: "translate-x-5" },
  lg: { track: "h-6 w-12", thumb: "h-5 w-5",  translate: "translate-x-6" },
};

const COLORS = {
  blue:   "bg-blue-600",
  green:  "bg-green-500",
  red:    "bg-red-500",
  purple: "bg-purple-600",
  gray:   "bg-gray-500",
};

/**
 * Toggle (Switch)
 *
 * @prop {string}    label          - label text
 * @prop {string}    name
 * @prop {boolean}   checked        - controlled value
 * @prop {Function}  onChange       - (event) => void
 * @prop {boolean}   disabled
 * @prop {string}    size           - sm | md | lg
 * @prop {string}    color          - blue | green | red | purple | gray
 * @prop {string}    labelPosition  - left | right  (default: right)
 * @prop {string}    hint           - small helper text below
 * @prop {string}    error
 * @prop {string}    className      - wrapper class
 */
const Toggle = ({
  label,
  name,
  checked = false,
  onChange,
  disabled = false,
  size = "md",
  color = "blue",
  labelPosition = "right",
  hint,
  error,
  className = "",
}) => {
  const uid = useId();
  const s   = SIZES[size] ?? SIZES.md;
  const c   = COLORS[color] ?? COLORS.blue;

  const track = (
    <div
      className={[
        s.track,
        "relative inline-flex shrink-0 rounded-full border-2 border-transparent",
        "cursor-pointer transition-colors duration-200 ease-in-out",
        "focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500",
        checked ? c : "bg-gray-200",
        disabled ? "opacity-50 cursor-not-allowed" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {/* Hidden real checkbox — keyboard + form accessible */}
      <input
        type="checkbox"
        id={uid}
        name={name}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="sr-only"
        role="switch"
        aria-checked={checked}
      />
      {/* Thumb */}
      <span
        aria-hidden="true"
        className={[
          s.thumb,
          "pointer-events-none inline-block rounded-full bg-white shadow",
          "ring-0 transition-transform duration-200 ease-in-out",
          checked ? s.translate : "translate-x-0",
        ].join(" ")}
      />
    </div>
  );

  const labelEl = label && (
    <label
      htmlFor={uid}
      className={[
        "text-sm font-medium text-gray-700",
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
      ].join(" ")}
    >
      {label}
    </label>
  );

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <div className="flex items-center gap-3">
        {labelPosition === "left" && labelEl}
        {track}
        {labelPosition === "right" && labelEl}
      </div>
      {error && <p role="alert" className="text-xs text-red-500">{error}</p>}
      {hint && !error && <p className="text-xs text-gray-500">{hint}</p>}
    </div>
  );
};

export default Toggle;
