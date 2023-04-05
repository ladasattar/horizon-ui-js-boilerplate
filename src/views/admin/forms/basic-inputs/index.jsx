import React from "react";
import FormLayout from "..";
import InputField from "components/fields/InputField";
import Checkbox from "components/checkbox";
import Switch from "components/switch";
import TextField from "components/fields/TextField";
import { useForm } from "react-hook-form";
import { setFormData } from "utils";
import { createBasicInput } from "api/BasicInputAPI";
import { toast } from "react-toastify";

export const BasicInput = () => {
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
      title="Basic Inputs"
      description="This inputs are the most basic inputs that you can use in your forms. It is only contain input text, number, email, password, and textarea."
      children={
        <form encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex w-full flex-col gap-3 rounded-2xl bg-white p-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
            <div className="flex gap-3">
              <div className="flex-1">
                <InputField
                  variant="auth"
                  extra="mb-3"
                  label="Email*"
                  placeholder="mail@simmmple.com"
                  id="email"
                  type="email"
                  name="email"
                  errors={errors}
                  register={register}
                  validationSchema={{
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  }}
                />
              </div>
              <div className="flex-1">
                <InputField
                  variant="auth"
                  extra="mb-3"
                  label="Password*"
                  placeholder="Min. 8 characters"
                  id="password"
                  type="password"
                  name="password"
                  errors={errors}
                  register={register}
                  validationSchema={{
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must have at least 8 characters",
                    },
                  }}
                />
              </div>
              <div className="flex-1">
                <InputField
                  variant=""
                  extra="mb-3"
                  label="Age*"
                  placeholder="Your Age"
                  id="age"
                  type="number"
                  name="age"
                  errors={errors}
                  register={register}
                  validationSchema={{
                    required: "Age is required",
                    pattern: {
                      value: /^[0-9]*$/,
                      message: "Age must be a number",
                    },
                  }}
                />
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-1">
                <TextField
                  variant=""
                  extra="mb-3"
                  label="Address*"
                  placeholder="Your Address"
                  id="address"
                  cols="30"
                  rows="10"
                  name="address"
                  errors={errors}
                  register={register}
                  validationSchema={{
                    required: "Address is required",
                  }}
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center">
                  <Switch
                    name="switch_1"
                    errors={errors}
                    register={register}
                    validationSchema={{}}
                  />
                  <p className="ml-2 text-sm font-medium text-navy-700 dark:text-white">
                    Switch
                  </p>
                </div>
              </div>
              {/* <div className="flex-1">
                <SwitchField
                  label="Switch Field"
                  desc="This is switch field"
                  name="switch_2"
                  errors={errors}
                  register={register}
                  validationSchema={{
                    required: "Address is required",
                  }}
                />
              </div> */}
              <div className="flex-1">
                <div className="flex items-center">
                  <Checkbox
                    required={true}
                    name="checkbox"
                    errors={errors}
                    register={register}
                    validationSchema={{
                      required: "Checkbox is required",
                    }}
                  />
                </div>
              </div>
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
