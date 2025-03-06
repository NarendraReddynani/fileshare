"use client";
import React, { useState } from 'react';
import { FiArrowLeft, FiCopy } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

function FileShareForm({ fileData, onSave }) {
    const [enablePassword, setEnablePassword] = useState(false);
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const router = useRouter();

    const handleSave = () => {
        if (onSave) {
            onSave({ password, email });
        }
    };

    return (
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-lg text-center">
                <h1 className="text-2xl font-bold sm:text-3xl">Share Your File!</h1>
                <p className="mt-4 text-gray-500">
                    Easily share your files with a short link and optional email notifications.
                </p>
            </div>

            <form className="mx-auto mt-8 mb-0 max-w-md space-y-4">
                <button onClick={() => router.push('/upload')} className="mb-4 flex items-center text-blue-500">
                    <FiArrowLeft className="mr-2" /> Go to Upload
                </button>

                <div className="border rounded-lg p-4 bg-gray-50">
                    <img src={fileData?.fileUrl} alt={fileData?.fileName} className="w-full h-60 object-contain" />
                    <p className="mt-2 text-center text-sm">{fileData?.fileName}</p>
                    <p className="text-center text-xs text-gray-500">{fileData?.fileType} / {fileData?.fileSize} bytes</p>
                </div>

                <div>
                    <label className="text-sm font-semibold">Short Url</label>
                    <div className="relative mt-2">
                        <input
                            type="text"
                            value={`http://localhost:3001/file-preview/${fileData?.id}`}
                            readOnly
                            className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-xs bg-gray-100"
                        />
                        <button className="absolute inset-y-0 end-0 grid place-content-center px-4 text-blue-500">
                            <FiCopy />
                        </button>
                    </div>
                </div>

                <div>
                    <label className="flex items-center text-sm">
                        <input type="checkbox" className="mr-2" checked={enablePassword} onChange={(e) => setEnablePassword(e.target.checked)} />
                        Enable Password?
                    </label>
                    {enablePassword && (
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-2 w-full rounded-lg border-gray-200 p-4 text-sm shadow-xs"
                        />
                    )}
                </div>

                <div>
                    <label className="text-sm font-semibold">Send File to Email</label>
                    <input
                        type="email"
                        placeholder="example@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-2 w-full rounded-lg border-gray-200 p-4 text-sm shadow-xs"
                    />
                </div>

                <button
                    type="submit"
                    onClick={handleSave}
                    className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white w-full"
                >
                    Save
                </button>
            </form>
        </div>
    );
}

export default FileShareForm;
