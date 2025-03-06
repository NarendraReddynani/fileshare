"use client";
import React, { useState, useEffect } from "react";
import UploadForm from "./_components/UploadForm";
import { app } from "../../../../firebaseConfig";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { db } from "../../../../firebaseConfig";
import { useUser } from "@clerk/nextjs";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from 'next/navigation';

function Upload() {
  const [progress1, setProgress1] = useState();
  const [uploadCompleted, setUploadCompleted] = useState(false);
  const [uploadId,setUploadId]=useState(null);
  const storage = getStorage(app);
  const { user } = useUser();
  const router = useRouter();

  const uploadFile = (file) => {
    if (!file) return;

    const metadata = { contentType: file.type };
    const storageRef = ref(storage, "file-upload/" + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress.toFixed(2) + "% done");
        setProgress1(progress);
      },
      (error) => {
        console.error("Upload failed:", error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at:", downloadURL);
          saveInfo(file, downloadURL);
          setUploadCompleted(true);
        });
      }
    );
  };

  const generateRandomString = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };

  const saveInfo = async (file, fileUrl) => {
    const docId = generateRandomString().toString();
    setUploadId(docId)
    await setDoc(doc(db, "uploadedFile", docId), {
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
      fileUrl: fileUrl,
      userEmail: user.primaryEmailAddress.emailAddress,
      userName: user.fullName,
      password: '',
      id: docId,
      shortUrl: process.env.NEXT_PUBLIC_BASE_URL + docId,
    });
  };

  useEffect(() => {
    if (uploadCompleted) {
      setTimeout(() => {
        setUploadCompleted(false);
        router.push('/file-preview/' +uploadId);
      }, 2000);
    }
  }, [uploadCompleted, router]);

  return (
    <div className="p-5 px-8 md:px-28 text-center">
      {uploadCompleted && <div role="alert" className="rounded-xl border border-gray-100 bg-white p-4">
  <div className="flex items-start gap-4">
    <span className="text-green-600">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    </span>

    <div className="flex-1">
      <strong className="block font-medium text-gray-900"> successfull </strong>

      <p className="mt-1 text-sm text-gray-700">file has uploaded successfully</p>
    </div>

    <button className="text-gray-500 transition hover:text-gray-600">
      <span className="sr-only">Dismiss popup</span>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="size-6"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </div>
</div>}
      <h2 className="text-[20px] text-center m-5">
        Start <strong className="text-primary"> Uploading File </strong> and
        <strong className="text-primary"> share it</strong>
      </h2>
      <UploadForm uploadBtnClick={uploadFile} progress={progress1} />
    </div>
  );
}

export default Upload;
