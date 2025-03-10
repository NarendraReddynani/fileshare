"use client";
import React, { useEffect, useState } from "react";
import { FiArrowLeft, FiCopy } from "react-icons/fi";
import { useRouter } from "next/navigation";
import GlobalApi from "@/app/_utils/GlobalApi";
import { useUser } from "@clerk/nextjs";

function FileShareForm({ fileData, onSavePassword }) {
    const [enablePassword, setEnablePassword] = useState(false);
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [isMounted, setIsMounted] = useState(false);
    const [toast, setToast] = useState(null); // Added toast state
    const { user } = useUser();
    const router = useRouter();

    useEffect(() => {
        setIsMounted(true);

        // Clear the toast after 2 seconds
        if (toast) {
            const timer = setTimeout(() => setToast(null), 2000);
            return () => clearTimeout(timer);
        }
    }, [toast]);

    if (!isMounted) return null;

    const handleSavePassword = () => {
        if (onSavePassword) {
            onSavePassword(password);
        }
    };

    const sendEmail = () => {
        if (!email) {
            console.error("Email is required");
            return;
        }

        const data = {
            emailToSend: email,
            userName: user?.fullName,
            fileName: fileData?.fileName || "",
            fileSize: fileData?.fileSize || "",
            fileType: fileData?.fileType || "",
            shortUrl: fileData?.shortUrl || "",
        };

        GlobalApi.SendEmail(data)
            .then((resp) => {
                console.log(resp);
            })
            .catch((error) => {
                console.error("Error sending email:", error.message);
            });
    };

    const onCopyClick = () => {
        navigator.clipboard.writeText(fileData?.shortUrl || "");
        setToast({
            status: "success",
            msg: "URL copied successfully!",
        });
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
                <button
                    type="button"
                    onClick={() => router.push("/upload")}
                    className="mb-4 flex items-center text-blue-500"
                >
                    <FiArrowLeft className="mr-2" /> Go to Upload
                </button>

                <div className="border rounded-lg p-4 bg-gray-50">
                    {fileData?.fileUrl ? (
                        <img
                            src={fileData.fileUrl}
                            alt={fileData.fileName}
                            className="w-full h-60 object-contain"
                        />
                    ) : (
                        <p>Loading image...</p>
                    )}
                    <p className="mt-2 text-center text-sm">{fileData?.fileName || "No file name"}</p>
                    <p className="text-center text-xs text-gray-500">
                        {fileData?.fileType || "Unknown type"} /{" "}
                        {fileData?.fileSize || "Unknown size"} bytes
                    </p>
                </div>

                <div>
                    <label className="text-sm font-semibold">Short Url</label>
                    <div className="relative mt-2">
                        <input
                            type="text"
                            value={fileData?.shortUrl || ""}
                            readOnly
                            className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-xs bg-gray-100"
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 end-0 grid place-content-center px-4 text-blue-500"
                            onClick={onCopyClick} // Correctly calling the function
                        >
                            <FiCopy />
                        </button>
                    </div>
                </div>

                <div>
                    <label className="flex items-center text-sm">
                        <input
                            type="checkbox"
                            className="mr-2"
                            checked={enablePassword}
                            onChange={(e) => setEnablePassword(e.target.checked)}
                        />
                        Enable Password?
                    </label>
                    {enablePassword && (
                        <>
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="mt-2 w-full rounded-lg border-gray-200 p-4 text-sm shadow-xs"
                            />
                            <button
                                type="button"
                                onClick={handleSavePassword}
                                className="inline-block mt-2 rounded-lg bg-green-500 px-5 py-2 text-sm font-medium text-white w-full"
                            >
                                Save Password
                            </button>
                        </>
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
                    type="button"
                    className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white w-full"
                    onClick={sendEmail}
                >
                    Share File
                </button>
            </form>

            {toast && (
                <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg">
                    {toast.msg}
                </div>
            )}
        </div>
    );
}

export default FileShareForm;
