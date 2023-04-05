import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import Card from "components/card";
import { MdFileUpload } from "react-icons/md";
import { Trash2 } from "react-feather";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

const DropzoneFile = (props) => {
  const { file, accept, text, dropFile, removeFile } = props;
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  // File upload
  const onDrop = useCallback(
    (acceptedFiles) => {
      acceptedFiles.forEach((file) => {
        dropFile(file);
      });
    },
    [dropFile]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: accept, // Using MIME Type https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
  });

  const onRemove = () => {
    removeFile();
  };
  // End file upload

  // PDF
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const goToPrevPage = () =>
    setPageNumber(pageNumber - 1 <= 1 ? 1 : pageNumber - 1);

  const goToNextPage = () =>
    setPageNumber(pageNumber + 1 >= numPages ? numPages : pageNumber + 1);
  // End PDF

  return (
    <Card className="relative grid h-full w-full grid-cols-1 gap-3 rounded-[20px] bg-white bg-clip-border p-3 font-dm shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none 2xl:grid-cols-11">
      {file !== undefined && (
        <div
          className="absolute right-0 z-10 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-red-500"
          onClick={onRemove}
          data-tooltip-id="remove-file"
          data-tooltip-content="Remove File"
        >
          <Tooltip
            id="remove-file"
            place="top"
            className="!rounded-lg !text-xs tracking-wide text-white"
          />
          <Trash2 color="white" width={18} />
        </div>
      )}
      <div className="col-span-full h-full w-full rounded-xl bg-lightPrimary dark:!bg-navy-700">
        {file === undefined ? (
          <div
            className="relative flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-xl border-[2px] border-dashed border-gray-200 py-3 text-center dark:!border-navy-700 lg:pb-0"
            {...getRootProps()}
          >
            <input {...getInputProps()} />
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
                  {Object.values(accept).map((types) => {
                    return types.map((type, index) => {
                      if (index < types.length - 1) return type + ", ";
                      else return type + " ";
                    });
                  })}{" "}
                  files are allowed
                </p>
              </div>
            )}
          </div>
        ) : // File is not image MIME type
        !file.type.startsWith("image/") ? (
          <div className="m-3">
            <nav className="flex flex-col items-center gap-2">
              <div className="flex gap-2">
                <button
                  className="rounded-lg bg-brand-800 py-1 px-3 text-center text-white"
                  type="button"
                  onClick={goToPrevPage}
                >
                  Prev
                </button>
                <button
                  className="rounded-lg bg-brand-800 py-1 px-3 text-center text-white"
                  type="button"
                  onClick={goToNextPage}
                >
                  Next
                </button>
              </div>
              <p>
                Page {pageNumber} of {numPages}
              </p>
            </nav>
            <div className="react-pdf-wrapper">
              <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
                <Page
                  size="A4"
                  pageNumber={pageNumber}
                  renderTextLayer={false}
                />
              </Document>
            </div>
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

export default DropzoneFile;
