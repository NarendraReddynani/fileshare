"use client";
import React, { useState } from "react";
import { Download } from "lucide-react";
import Image from "next/image";

const FileItem = ({ file }) => {
  const [password, setPassword] = useState("");
  const isPasswordCorrect = !file?.password || (file?.password === password);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white rounded-xl shadow-md max-w-sm w-full">
        <h2 className="text-2xl font-bold text-green-500 mb-2 p-5">
          Game Play <span className="text-black">Shared the file with You</span>
        </h2>
        <p className="text-gray-500 mb-4 p-5">Find File details below</p>

        <div className='flex items-center justify-center mb-5 p-5'>
          <Image src='/download.png' alt='file' width={50} height={50} />
        </div>

        <p className="font-bold text-green-500 mb-4 p-5">
          {file?.fileName || "File Name"} ⚡ {file?.fileType || "image/png"} ⚡ {(file?.fileSize/1024/1024).toFixed(2) || "2MB"}MB
        </p>

        {file?.password?.length >= 1 ? (
          <input
            type="password"
            placeholder="Enter password to access"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none"
          />
        ) : null}

        <button
          disabled={!isPasswordCorrect}
          className={`w-full p-2 flex items-center justify-center rounded-md text-white ${
            isPasswordCorrect ? "bg-green-500 hover:bg-green-600 cursor-pointer" : "bg-gray-400 cursor-not-allowed"
          } p-5` 
        }
        onClick={()=>{ fetch(file?.fileUrl)
            .then((response) => response.blob())
            .then((blob) => {
              const url = window.URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.style.display = "none";
              a.href = url;
              a.download = file?.fileName || "download";
              document.body.appendChild(a);
              a.click();
              window.URL.revokeObjectURL(url);
              document.body.removeChild(a);
            })
            .catch((err) => console.error("Failed to download file", err));}}
        >
          <Download className="mr-2" /> Download
        </button>

        <p className="text-xs text-gray-400 mt-4 p-5">*Terms and Conditions apply</p>
      </div>
    </div>
  );
};

export default FileItem;
