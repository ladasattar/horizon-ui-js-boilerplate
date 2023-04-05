import { MdFileUpload } from "react-icons/md";
import Card from "components/card";
import React from "react";

const Upload = (props) => {
  const { file, fileTypes, text, getRootProps, getInputProps, isDragActive } =
    props;

  return (
    <Card className="grid h-full w-full grid-cols-1 gap-3 rounded-[20px] bg-white bg-clip-border p-3 font-dm shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none 2xl:grid-cols-11">
      <div className="col-span-12 h-full w-full rounded-xl bg-lightPrimary dark:!bg-navy-700">
        {file === undefined ? (
          <div
            className="relative flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-xl border-[2px] border-dashed border-gray-200 py-3 text-center dark:!border-navy-700 lg:pb-0"
            {...getRootProps}
          >
            <input {...getInputProps} />
            <MdFileUpload className="text-[80px] text-brand-500 dark:text-white" />
            <h4 className="text-xl font-bold text-brand-500 dark:text-white">
              {text}
            </h4>
            {isDragActive ? (
              <p className="text-sm font-medium text-gray-600">
                Drop the files here ...
              </p>
            ) : (
              <div className="mb-2 mt-1">
                <p className="text-sm font-medium text-gray-600">
                  Drag 'n' drop some files here, or click to select files
                </p>
                <p className="text-sm font-medium text-gray-600">
                  {fileTypes.map((type, index) => {
                    if (index < fileTypes.length - 1) return type + ", ";
                    else return type + " ";
                  })}{" "}
                  files are allowed
                </p>
              </div>
            )}
          </div>
        ) : (
          <div
            className="group flex flex-col items-center justify-center gap-2 overflow-hidden rounded-xl border-[2px] border-dashed border-gray-200 py-3 px-3"
            {...getRootProps}
          >
            <input {...getInputProps} />
            <div className="relative">
              <img
                src={URL.createObjectURL(file)}
                alt={file.name}
                className="rounded-lg"
              />
              <div className="invisible absolute top-0 left-0 flex h-full w-full cursor-pointer items-center justify-center rounded-xl bg-white bg-opacity-0 transition-all group-hover:visible group-hover:bg-opacity-30">
                <p className="invisible w-max rounded-3xl bg-brand-900 py-2 px-3 text-white opacity-0 transition-all group-hover:visible group-hover:opacity-100">
                  Click to change file
                </p>
              </div>
            </div>
            <p className="text-sm font-medium text-gray-600">{file.name}</p>
            <div className="flex items-center justify-center gap-2">
              <p className="text-sm font-medium text-gray-600">
                {file.size > 1024 * 1024
                  ? (file.size / (1024 * 1024)).toFixed(2) + " MB"
                  : file.size > 1024
                  ? (file.size / 1024).toFixed(2) + " KB"
                  : file.size + " B"}
              </p>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default Upload;
