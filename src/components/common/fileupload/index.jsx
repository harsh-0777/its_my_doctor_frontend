import { useId, useRef, useState } from "react";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const formatBytes = (bytes) => {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
};

const isImage = (file) => file.type.startsWith("image/");

const UploadIcon = () => (
  <svg className="h-8 w-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
      d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5
         m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
  </svg>
);

const TrashIcon = () => (
  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858
         L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * FileUpload
 *
 * @prop {string}    label           - field label
 * @prop {string}    name
 * @prop {string}    accept          - e.g. "image/*" | ".pdf,.doc" | "image/png,image/jpeg"
 * @prop {boolean}   multiple        - allow multiple files
 * @prop {number}    maxSize         - max size per file in bytes (e.g. 5 * 1024 * 1024 = 5MB)
 * @prop {number}    maxFiles        - max number of files when multiple=true
 * @prop {boolean}   showPreview     - show image preview thumbnails
 * @prop {boolean}   dragAndDrop     - enable drag & drop zone
 * @prop {Function}  onChange        - (files: File[]) => void
 * @prop {Function}  onError         - (message: string) => void
 * @prop {string}    error           - external error message
 * @prop {string}    hint            - helper text
 * @prop {boolean}   disabled
 * @prop {boolean}   required
 * @prop {string}    className       - wrapper class
 */
const FileUpload = ({
  label,
  name,
  accept,
  multiple = false,
  maxSize,
  maxFiles,
  showPreview = true,
  dragAndDrop = true,
  onChange,
  onError,
  error: externalError,
  hint,
  disabled = false,
  required = false,
  className = "",
}) => {
  const uid = useId();
  const inputRef = useRef(null);
  const [files, setFiles]     = useState([]);
  const [dragging, setDragging] = useState(false);
  const [internalError, setInternalError] = useState("");

  const error = externalError || internalError;

  // ── Validation ────────────────────────────────────────────────────────────

  const validate = (incoming) => {
    if (maxFiles && incoming.length > maxFiles) {
      const msg = `Maximum ${maxFiles} file${maxFiles > 1 ? "s" : ""} allowed.`;
      setInternalError(msg);
      onError?.(msg);
      return false;
    }
    for (const file of incoming) {
      if (maxSize && file.size > maxSize) {
        const msg = `"${file.name}" exceeds the ${formatBytes(maxSize)} limit.`;
        setInternalError(msg);
        onError?.(msg);
        return false;
      }
    }
    setInternalError("");
    return true;
  };

  // ── Handlers ──────────────────────────────────────────────────────────────

  const handleFiles = (incoming) => {
    const arr = Array.from(incoming);
    if (!validate(arr)) return;

    const next = multiple ? [...files, ...arr] : arr;
    setFiles(next);
    onChange?.(next);
  };

  const handleInputChange = (e) => handleFiles(e.target.files);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    if (disabled) return;
    handleFiles(e.dataTransfer.files);
  };

  const handleRemove = (index) => {
    const next = files.filter((_, i) => i !== index);
    setFiles(next);
    onChange?.(next);
    // Reset input so the same file can be re-selected
    if (inputRef.current) inputRef.current.value = "";
  };

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {/* Label */}
      {label && (
        <label htmlFor={uid} className="text-sm font-medium text-gray-700">
          {label}
          {required && <span className="ml-1 text-red-500" aria-hidden="true">*</span>}
        </label>
      )}

      {/* Drop zone */}
      <div
        role={dragAndDrop ? "button" : undefined}
        tabIndex={dragAndDrop && !disabled ? 0 : undefined}
        aria-label={dragAndDrop ? "Click or drag files here to upload" : undefined}
        onClick={() => !disabled && inputRef.current?.click()}
        onKeyDown={(e) => e.key === "Enter" && !disabled && inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); if (!disabled) setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        className={[
          "flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed",
          "px-4 py-8 text-center transition-colors duration-200",
          "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
          disabled
            ? "cursor-not-allowed border-gray-200 bg-gray-50 opacity-50"
            : dragging
            ? "border-blue-400 bg-blue-50 cursor-copy"
            : "border-gray-300 bg-white hover:border-blue-400 hover:bg-gray-50 cursor-pointer",
          error ? "border-red-400" : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <UploadIcon />
        <div>
          <p className="text-sm font-medium text-gray-700">
            {dragging ? "Drop files here" : "Click to upload or drag & drop"}
          </p>
          <p className="text-xs text-gray-400 mt-0.5">
            {[
              accept && `Accepted: ${accept}`,
              maxSize && `Max size: ${formatBytes(maxSize)}`,
              maxFiles && multiple && `Max files: ${maxFiles}`,
            ]
              .filter(Boolean)
              .join(" · ")}
          </p>
        </div>
      </div>

      {/* Hidden input */}
      <input
        ref={inputRef}
        id={uid}
        type="file"
        name={name}
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        required={required && files.length === 0}
        onChange={handleInputChange}
        className="sr-only"
        aria-invalid={!!error}
      />

      {/* Error / Hint */}
      {error && <p role="alert" className="text-xs text-red-500">{error}</p>}
      {hint && !error && <p className="text-xs text-gray-500">{hint}</p>}

      {/* File list + previews */}
      {files.length > 0 && (
        <ul className="mt-1 flex flex-col gap-2">
          {files.map((file, i) => (
            <li key={`${file.name}-${i}`}
              className="flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2">

              {/* Image preview */}
              {showPreview && isImage(file) && (
                <img
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  className="h-10 w-10 rounded object-cover shrink-0"
                />
              )}

              {/* File info */}
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-gray-700">{file.name}</p>
                <p className="text-xs text-gray-400">{formatBytes(file.size)}</p>
              </div>

              {/* Remove */}
              <button
                type="button"
                onClick={() => handleRemove(i)}
                disabled={disabled}
                aria-label={`Remove ${file.name}`}
                className="shrink-0 rounded p-1 text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors disabled:cursor-not-allowed"
              >
                <TrashIcon />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FileUpload;
