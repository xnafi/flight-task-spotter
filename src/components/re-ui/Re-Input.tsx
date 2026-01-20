import { InputProps } from "@/types/allTypes";

export function ReInput({
  id,
  name,
  label,
  type = "text",
  value,
  onChange,
  className = "",
  placeHolder = " ",
}: InputProps) {
  return (
    <div className="relative w-fit">
      <input
        id={id}
        name={name ?? id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeHolder}
        className={` peer w-full px-2.5 py-2.75 text-xs border-2 border-[#12a4e5] rounded-[5px] focus:outline-none placeholder:text-transparent
          ${className}
        `}
      />

      <label
        htmlFor={id}
        className="absolute left-1.75 px-0.75 text-xs font-semibold text-white bg-[#12a4e5] transition-all pointer-events-none top-1/2 -translate-y-1/2 peer-focus:-top-1.5 peer-focus:text-xs peer-focus:translate-y-0 peer-not-placeholder-shown:-top-1.5 peer-not-placeholder-shown:translate-y-0"
      >
        {label}
      </label>
    </div>
  );
}
