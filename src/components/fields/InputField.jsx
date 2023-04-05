// Custom components
import React from "react";

function InputField(props) {
  const {
    label,
    id,
    extra,
    type,
    placeholder,
    variant,
    state,
    disabled,
    onChange,
    errors,
    name,
    register,
    validationSchema,
  } = props;

  return (
    <div className={`${extra}`}>
      <label
        htmlFor={id}
        className={`text-sm text-navy-700 dark:text-white ${
          variant === "auth" ? "ml-1.5 font-medium" : "ml-3 font-bold"
        }`}
        dangerouslySetInnerHTML={{
          __html: label.includes("*")
            ? label.split("*")[0] + `<span class='text-red-500'>*</span>`
            : label,
        }}
      ></label>
      <input
        disabled={disabled}
        type={type}
        id={id}
        placeholder={placeholder}
        minLength={type === "password" ? 8 : 0}
        className={`mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none ${
          disabled === true
            ? "!border-none !bg-gray-100 dark:!bg-white/5 dark:placeholder:!text-[rgba(255,255,255,0.15)]"
            : state === "error"
            ? "border-red-500 text-red-500 placeholder:text-red-500 dark:!border-red-400 dark:!text-red-400 dark:placeholder:!text-red-400"
            : state === "success"
            ? "border-green-500 text-green-500 placeholder:text-green-500 dark:!border-green-400 dark:!text-green-400 dark:placeholder:!text-green-400"
            : "border-gray-200 dark:!border-white/10 dark:text-white"
        }`}
        onChange={onChange}
        {...register(name, validationSchema)}
      />
      {errors && errors[name]?.type === "required" && (
        <span className="error text-red-500">{errors[name]?.message}</span>
      )}
      {errors && errors[name]?.type === "minLength" && (
        <span className="error text-red-500">{errors[name]?.message}</span>
      )}
      {errors && errors[name]?.type === "pattern" && (
        <span className="error text-red-500">{errors[name]?.message}</span>
      )}
    </div>
  );
}

export default InputField;