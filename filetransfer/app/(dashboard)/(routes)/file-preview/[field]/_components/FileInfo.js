"use client";
import React from 'react';

function FileInfo({ fileData }) {
    return (
        <div className="w-full max-w-md mb-4 p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-xl font-bold mb-2">{fileData?.fileName}</h2>
            <div className="flex flex-col items-center">
                <img src={fileData?.fileUrl} alt={fileData?.fileName} className="w-80 h-60 object-contain mb-4" />
                <p className="text-gray-500">{fileData?.fileType} / {fileData?.fileSize} bytes</p>
            </div>
        </div>
    );
}

export default FileInfo;
