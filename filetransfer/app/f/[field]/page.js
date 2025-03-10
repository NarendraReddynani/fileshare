"use client";
import Link from "next/link";
import { db } from "../../../firebaseConfig";
import FileItem from './_components/fileItem'
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState, use } from "react";
import Image from "next/image";

function FileView({ params }) {
    const unwrappedParams = use(params); // Directly unwrap params using use()
    const [file, setFile] = useState(null);
    const field = unwrappedParams?.field;

    useEffect(() => {
        if (field) {
            console.log("Field:", field);
            getFileInfo(field);
        }
    }, [field]);

    const getFileInfo = async (field) => {
        try {
            const docRef = doc(db, "uploadedFile", field);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const fileData = docSnap.data();
                setFile(fileData);
                console.log("File Data:", fileData);
            } else {
                console.log("No such document!");
            }
        } catch (error) {
            console.error("Error fetching document:", error);
        }
    };

    return (
        <div className='bg-gray-100 h-screen w-full flex flex-col justify-center items-center gap-4'>
            <Link href='' className='absolute top-4'>
                <Image src='/logo.svg' alt='logo' width={150} height={100} />
            </Link>
            <FileItem file={file} />
        </div>
    )
}

export default FileView;
