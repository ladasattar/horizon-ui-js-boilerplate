import React, { useState } from "react";
import FormLayout from "..";
import InputField from "components/fields/InputField";
import { useForm } from "react-hook-form";
import { setFormData } from "utils";
import { createBasicInput } from "api/BasicInputAPI";
import { toast } from "react-toastify";
import DropzoneFile from "../../../../components/dropzone/DropzoneFile";

export const FileInput = () => {
  const [payload, setPayload] = useState({
    email: "",
    file: undefined,
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // File upload
  // const onDrop = useCallback((acceptedFiles) => {
  //   acceptedFiles.forEach((file) => {
  //     setPayload((prev) => ({
  //       ...prev,
  //       file: file,
  //     }));
  //   });
  // }, []);
  // const { getRootProps, getInputProps, isDragActive } = useDropzone({
  //   onDrop,
  //   maxFiles: 1,
  //   accept: {
  //     "image/jpeg": [".jpg", ".jpeg", ".png"],
  //   },
  // });

  const dropFile = (file) => {
    setPayload((prev) => ({
      ...prev,
      file: file,
    }));

    console.log(file);
  };

  // const removeFile = () => {
  //   setPayload({
  //     ...payload,
  //     file: undefined,
  //   });
  // };

  const removeFile = () => {
    setPayload({
      ...payload,
      file: undefined,
    });
  };

  // End file upload

  const onSubmit = () => {
    if (payload.file === undefined) return toast.error("File is required");
    else {
      const body = setFormData(payload);
      const promise = createBasicInput(body);

      toast.promise(promise, {
        pending: "Loading...",
        success: "Data retrieved",
        error: "Error while retrieving data",
      });

      promise.then((res) => {
        if (res.status === 200) reset();
      });
    }
  };

  return (
    <FormLayout
      title="File Input"
      description="This input is used to upload files. You can upload multiple files at once."
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
                    onChange: (e) => {
                      setPayload((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }));
                    },
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  }}
                />
              </div>
              <div className="flex-1">
                <DropzoneFile
                  text="Upload file"
                  accept={{
                    "image/jpeg": [".jpg", ".jpeg", ".png"],
                  }}
                  dropFile={dropFile}
                  removeFile={removeFile}
                  file={payload.file}
                />
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-1">
                <InputField
                  variant="auth"
                  extra="mb-3"
                  label="Other Field*"
                  placeholder="mail@simmmple.com"
                  id="other"
                  type="other"
                  name="other"
                  errors={errors}
                  register={register}
                  validationSchema={{
                    required: "Other is required",
                    onChange: (e) => {
                      setPayload((prev) => ({
                        ...prev,
                        other: e.target.value,
                      }));
                    },
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid other",
                    },
                  }}
                />
              </div>
              <div className="flex-1">
                <DropzoneFile
                  text="Upload file"
                  accept={{
                    "image/jpeg": [".jpg", ".jpeg", ".png"],
                    "application/pdf": [".pdf"],
                  }}
                  dropFile={dropFile}
                  removeFile={removeFile}
                  file={payload.file}
                />
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
