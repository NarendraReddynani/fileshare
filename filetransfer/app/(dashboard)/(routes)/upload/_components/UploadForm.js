import React, { useState } from 'react';
import AlertMessage from '../_components/AlertMessage'
import FilePreview from '../_components/FilePreview'

function UploadForm() {
  const [file, setFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const onFileUpload = (file) => {
    if (!file) {
      setErrorMessage('No file selected');
      return;
    }
    console.log(file)

    if (file.size > 2000000) { // 2MB limit
      setErrorMessage('Size of file is more than 2MB');
      setFile(null);
      return;
    }
    
    setErrorMessage(null);
    setFile(file);
  };

  return (
    <div className="text-center">
      <div className="flex items-center justify-center w-full">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-green-400 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-green-200 dark:bg-green-100 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-12 h-12 mb-4 text-green-400 dark:text-green-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-lg md:text-2xl text-gray-500 dark:text-gray-400">
              <span className="font-semibold text-sky-500">Click to upload</span> or{' '}
              <strong className="text-sky-500">drag</strong> and <strong className="text-sky-500">drop</strong>
            </p>
            <p className="text-xs text-red-500 dark:text-red-400">
              <strong>SVG, PNG, JPG, or GIF (Max Size: 2MB)</strong>
            </p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            onChange={(e) => onFileUpload(e.target.files[0])}
            accept=".svg,.png,.jpg,.jpeg,.gif"
          />
        </label>
      </div>

      {errorMessage && <AlertMessage msg={errorMessage} />}
      {file?<FilePreview file={file} removeFile={()=>setFile(null)}/>:null}

      <button
        disabled={!file}
        className="p-2 bg-green-500 text-white w-[30%] rounded-full mt-5 hover:bg-green-400 disabled:bg-gray-300"
      >
        Upload
      </button>
    </div>
  );
}

export default UploadForm;
