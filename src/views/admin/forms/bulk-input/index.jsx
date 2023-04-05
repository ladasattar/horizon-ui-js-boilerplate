import React, { useCallback, useState, cloneElement, useEffect } from "react";
import FormLayout from "..";
import InputField from "components/fields/InputField";
import { useForm } from "react-hook-form";
import { setFormData } from "utils";
import { createBasicInput } from "api/BasicInputAPI";
import { toast } from "react-toastify";
import { useDropzone } from "react-dropzone";
import { Copy, Trash2 } from "react-feather";
import DropzoneFile from "components/dropzone/DropzoneFile";

export const BulkInput = () => {
  const [payload, setPayload] = useState({
    email: "",
    file: undefined,
  });
  const [inputs, setInputs] = useState(1);
  const [elements, setElements] = useState([]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // File upload
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      setPayload((prev) => ({
        ...prev,
        file: file,
      }));
    });
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: {
      "image/jpeg": [".jpg", ".jpeg", ".png"],
    },
  });
  // End file upload

  const cloneInputs = () => {
    // const inputs = document.querySelectorAll(".input-group");
    setElements((prev) => [
      ...prev,
      <InputGroup onClick={removeInput} key={inputs.length + 1} />,
    ]);

    // turn off disabled attribute button
    const disabledBtn = document.querySelector(".btn-remove-input-group");
    disabledBtn.removeAttribute("disabled");
    disabledBtn.classList.remove("disabled");

    // const lastInput = inputs[inputs.length - 1];
    // const clone = lastInput.cloneNode(true);
    // lastInput.after(clone);
    setInputs(inputs.length + 1);
  };

  const removeInput = (e) => {
    const inputs = document.querySelectorAll(".input-group");
    if (inputs.length > 1) {
      e.target.parentNode.parentNode.parentNode.remove();
      setInputs(inputs.length - 1);
    }
  };

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

  const InputGroup = (props) => (
    <div className="input-group flex gap-3 sm-max:flex-col">
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
          fileTypes={[".jpg", ".jpeg", ".png"]}
          getRootProps={getRootProps()}
          getInputProps={getInputProps()}
          isDragActive={isDragActive}
          file={payload.file}
        />
      </div>
      <div className="relative pt-1">
        <button
          type="button"
          className={`btn-remove-input-group rounded-md bg-red-600 px-2 py-1 text-center sm-max:float-right`}
          onClick={(e) => props.onClick(e)}
        >
          <Trash2 className="text-white" width={18} />
        </button>
      </div>
    </div>
  );

  useEffect(() => {
    const elements = [];
    elements.push(<InputGroup onClick={removeInput} key={inputs} />);
    setElements(elements);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <FormLayout
      title="Bulk Input"
      description="Bulk input is a form that allows you to upload multiple data at once. This form using array of objects as a data structure."
      children={
        <form encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex w-full flex-col gap-3 rounded-2xl bg-white p-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
            {/* {<InputGroup />} */}
            {elements.map((element, index) => {
              return cloneElement(element, { key: index });
            })}
            <button
              type="button"
              className="mt-5 h-full w-full rounded-xl border-[2px] border-dashed border-brand-200 py-3 text-center"
              onClick={() => cloneInputs()}
            >
              <div className="flex items-center justify-center gap-2">
                <Copy className="text-gray-700" />
                <p className="font-medium text-gray-700">Add More Input</p>
              </div>
            </button>
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
