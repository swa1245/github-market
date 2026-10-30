export default function AuthInput({
  id,
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  autoComplete,
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-[13px] font-medium text-[#9b9b9b]">
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        className="w-full rounded-md border border-[#e5e5e5] px-3.5 py-2.5 text-[14px] font-medium text-[#2c2c2c] outline-none placeholder:font-normal placeholder:text-[#bfbfbf] focus:border-[#21943a]"
      />
    </div>
  )
}
