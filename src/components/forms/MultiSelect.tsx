import { useState } from "react";

type MultiSelectProps = {
  label?: string;
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
};

const MultiSelect: React.FC<MultiSelectProps> = ({
  label,
  options,
  selected,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOption = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter((v) => v !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  return (
    <div className="relative inline-block w-full max-w-md">
      {label && <label className="block mb-1 font-medium">{label}</label>}
      <div
        className="border p-2 rounded cursor-pointer bg-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selected.length > 0 ? (
          <div className="flex flex-wrap gap-1">
            {selected.map((val) => (
              <span key={val} className="bg-gray-200 px-2 py-1 rounded text-sm">
                {val}
              </span>
            ))}
          </div>
        ) : (
          <span className="text-gray-500">Any</span>
        )}
      </div>

      {isOpen && (
        <ul className="absolute z-10 mt-1 w-full border rounded bg-white shadow">
          {options.map((option) => (
            <li key={option} className="px-3 py-2 hover:bg-gray-100">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selected.includes(option)}
                  onChange={() => toggleOption(option)}
                />
                {option}
              </label>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MultiSelect;
