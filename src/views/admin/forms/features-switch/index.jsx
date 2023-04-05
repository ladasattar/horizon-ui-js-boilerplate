import React from "react";
import FormLayout from "..";
import SwitchField from "components/fields/SwitchField";
import { useForm } from "react-hook-form";
import { setFormData } from "utils";
import { createBasicInput } from "api/BasicInputAPI";
import { toast } from "react-toastify";

export const FeaturesSwitch = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const payload = setFormData(data);
    const promise = createBasicInput(payload);

    toast
      .promise(promise, {
        pending: "Loading...",
        success: "Data retrieved",
        error: "Error while retrieving data",
      })
      .then((res) => {
        console.log(res);
        reset();
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <FormLayout
      title="Features Switch"
      description="Features switch is a switch that can be used to turn on or off a feature."
      children={
        <form encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex w-full flex-col gap-3 rounded-2xl bg-white p-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
            <div className="grid grid-cols-3 gap-4">
              <SwitchField
                label="Pendaftaran SD"
                desc="Buka pendaftaran untuk tingkat SD"
                name="register_sd"
                errors={errors}
                register={register}
                validationSchema={{}}
              />
              <SwitchField
                label="Pendaftaran SMP"
                desc="Buka pendaftaran untuk tingkat SMP"
                name="register_smp"
                errors={errors}
                register={register}
                validationSchema={{}}
              />
              <SwitchField
                label="Pendaftaran SMA"
                desc="Buka pendaftaran untuk tingkat SMA"
                name="register_sma"
                errors={errors}
                register={register}
                validationSchema={{}}
              />
            </div>
            <div className="flex justify-end">
              <button
                className="linear max-w-max rounded-[20px] bg-brand-900 px-4 py-2 text-base font-medium text-white transition duration-200 hover:bg-brand-800 active:bg-brand-700 dark:bg-brand-400 dark:hover:bg-brand-300 dark:active:opacity-90"
                type="submit"
                onClick={handleSubmit(onSubmit)}
              >
                Save Data
              </button>
            </div>
          </div>
        </form>
      }
    />
  );
};
