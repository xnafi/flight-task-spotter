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
  ...rest
}: InputProps & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="relative w-full">
      <input
        id={id}
        name={name ?? id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeHolder}
        className={` peer w-full text-md px-2.5 pt-4 pb-2 border-2 cursor-pointer border-[#12a4e5] rounded-[5px] focus:outline-none placeholder:text-transparent${className}`}
        {...rest}
      />

      <label
        htmlFor={id}
        className="absolute left-1.75 px-2 text-sm font-semibold rounded-sm  text-white bg-[#12a4e5] transition-all pointer-events-none top-1/2 -translate-y-1/2 peer-focus:-top-1.5 peer-focus:text-sm peer-focus:translate-y-0 peer-not-placeholder-shown:-top-1.5 peer-not-placeholder-shown:translate-y-0"
      >
        {label}
      </label>
    </div>
  );
}
