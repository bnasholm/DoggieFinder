type InputType = {
  label?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = ({
  value,
  onChange,
  placeholder,
  label,
  type = "text",
  id,
  ...props
}: InputType) => {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, "-") || undefined;

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className={"block mb-1 font-medium"}>
          {label}
        </label>
      )}
      <input
        id={inputId}
        type={type}
        placeholder={placeholder}
        className="w-full border rounded px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={value}
        onChange={onChange}
        {...props}
      />
    </div>
  );
};

export default Input;
