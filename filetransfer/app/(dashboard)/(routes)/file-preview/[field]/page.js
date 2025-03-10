"use client";
import React, { useEffect, useState } from "react";
import { db } from "../../../../../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { updateDoc } from "firebase/firestore";
import FileShareForm from "./_components/FileShareForm";

function FilePreview({ params }) {
    const [field, setField] = useState(null);
    const [file, setFile] = useState();

    useEffect(() => {
        const unwrapParams = async () => {
            const unwrappedParams = await params;
            setField(unwrappedParams?.field);
        };
        unwrapParams();
    }, [params]);

    useEffect(() => {
        field && getFileInfo();
    }, [field]);

    const getFileInfo = async () => {
        const docRef = doc(db, "uploadedFile", field);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            setFile(docSnap.data());
        } else {
            console.log("No such document!");
        }
    };

    const handleSavePassword = async (password) => {
        console.log("Saved Password:", password);
        const docRef = doc(db, "uploadedFile", field);

        // Set the "capital" field of the city 'DC'
        await updateDoc(docRef, {
            password:password
        });

        // Perform the action to save the password here (e.g., update the database)
    };

    // const handleShare = ({ password, email }) => {
    //     console.log("Sharing File with Password:", password, "and Email:", email);
    //     // Perform the file sharing logic here
    // };

    return (
        <div>
            <FileShareForm
                fileData={file}

                onSavePassword={handleSavePassword}
            />
        </div>
    );
}

export default FilePreview;
