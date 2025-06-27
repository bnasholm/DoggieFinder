import { useState } from "react";

type TagInputProps = {
  label?: string;
  placeholder?: string;
  values: string[];
  onChange: (updatedValues: string[]) => void;
  hideLabel?: boolean;
};

const TagInput: React.FC<TagInputProps> = ({
  label,
  placeholder,
  values,
  onChange,
  hideLabel = false,
}) => {
  const [inputValue, setInputValue] = useState("");

  const addTag = () => {
    const trimmed = inputValue.trim();
    if (trimmed && !values.includes(trimmed)) {
      onChange([...values, trimmed]);
    }
    setInputValue("");
  };

  const removeTag = (tag: string) => {
    onChange(values.filter((val) => val !== tag));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <div className="w-full">
      {label && (
        <label
          className={
            hideLabel
              ? "sr-only"
              : "block mb-1 font-medium text-slate-800 text-sm"
          }
        >
          {label}
        </label>
      )}

      <div className="border rounded px-2 py-2 bg-white flex flex-wrap gap-1 focus-within:ring-2 focus-within:ring-blue-500">
        {values.map((val) => (
          <span
            key={val}
            className="bg-gray-200 px-2 py-1 rounded text-sm flex items-center gap-1"
          >
            {val}
            <button
              type="button"
              onClick={() => removeTag(val)}
              className="text-gray-500 hover:text-red-500"
            >
              &times;
            </button>
          </span>
        ))}

        <input
          type="text"
          className="flex-1 min-w-[100px] border-none outline-none text-sm"
          placeholder={placeholder}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
};

export default TagInput;
