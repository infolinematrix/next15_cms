import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";

export default function NodeImageUpload({ setFiles, image }: any) {
  const {
    acceptedFiles,
    fileRejections,
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: {
      "image/jpeg": [".jpeg", ".png"],
    },
    maxFiles: 1,
    maxSize: 400 * 400,
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, URL.createObjectURL(file))
        )
      );
    },
  });

  // console.log("-------------", file);

  const thumbs =
    image && acceptedFiles.length === 0 ? (
      <div key={image}>
        <img
          src={`/${image}`}
          alt="Uploaded"
          className="h-full w-full object-cover"
        />
      </div>
    ) : (
      acceptedFiles.map((file) => (
        <div key={file.path}>
          <img
            src={URL.createObjectURL(file)}
            alt={file.path}
            className="h-full w-full object-cover"
            // Revoke data uri after image is loaded
            onLoad={() => {
              URL.revokeObjectURL(URL.createObjectURL(file));
            }}
          />
        </div>
      ))
    );

  return (
    <div className="flex flex-col gap-3">
      <div className="items-center justify-center flex">
        <div {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} />
          {isDragAccept && <p>All files will be accepted</p>}
          {isDragReject && (
            <p className="text-xs text-red-800 ">Invalid file format/size</p>
          )}
          {!isDragActive && (
            <div className="text-sm flex gap-2">
              <div>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.81825 1.18188C7.64251 1.00615 7.35759 1.00615 7.18185 1.18188L4.18185 4.18188C4.00611 4.35762 4.00611 4.64254 4.18185 4.81828C4.35759 4.99401 4.64251 4.99401 4.81825 4.81828L7.05005 2.58648V9.49996C7.05005 9.74849 7.25152 9.94996 7.50005 9.94996C7.74858 9.94996 7.95005 9.74849 7.95005 9.49996V2.58648L10.1819 4.81828C10.3576 4.99401 10.6425 4.99401 10.8182 4.81828C10.994 4.64254 10.994 4.35762 10.8182 4.18188L7.81825 1.18188ZM2.5 9.99997C2.77614 9.99997 3 10.2238 3 10.5V12C3 12.5538 3.44565 13 3.99635 13H11.0012C11.5529 13 12 12.5528 12 12V10.5C12 10.2238 12.2239 9.99997 12.5 9.99997C12.7761 9.99997 13 10.2238 13 10.5V12C13 13.104 12.1062 14 11.0012 14H3.99635C2.89019 14 2 13.103 2 12V10.5C2 10.2238 2.22386 9.99997 2.5 9.99997Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              Upload Image
            </div>
          )}
        </div>
      </div>

      <aside className="h-[150px] w-[150px] bg-gray-200 items-center justify-center flex rounded-lg overflow-clip ">
        <ul>{thumbs}</ul>
      </aside>
    </div>
  );
}
