import Switch from "components/switch";

const SwitchField = (props) => {
  const {
    id,
    label,
    desc,
    mt,
    mb,
    onChange,
    checked,
    name,
    errors,
    register,
    validationSchema,
  } = props;
  return (
    <div className={`flex justify-between ${mt} ${mb} items-center`}>
      <label
        htmlFor={id}
        className="max-w-[80%] hover:cursor-pointer lg:max-w-[65%]"
      >
        <h5 className="text-base font-bold text-navy-700 dark:text-white">
          {label}
        </h5>
        <p className={`text-base text-gray-600`}>{desc}</p>
      </label>
      <div>
        <Switch
          id={id}
          checked={checked}
          onChange={onChange}
          register={register}
          name={name}
          validationSchema={validationSchema}
          errors={errors}
        />
      </div>
    </div>
  );
};

export default SwitchField;
