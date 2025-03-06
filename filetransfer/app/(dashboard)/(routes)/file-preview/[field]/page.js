"use client";
import React, { useEffect, useState } from 'react';
import { db } from '../../../../../firebaseConfig';
import { doc, getDoc } from "firebase/firestore";
import FileInfo from './_components/FileInfo';
import FileShareForm from './_components/FileShareForm'

function FilePreview({ params }) {
    const [field, setField] = useState(null);
    const [file,setFile]=useState();

    useEffect(() => {
        const unwrapParams = async () => {
            const unwrappedParams = await params;
            setField(unwrappedParams?.field);
        };
        unwrapParams();
    }, [params]);

    useEffect(() => {
        console.log(field);
        field && getFileInfo();
    }, [field]);

    const getFileInfo = async () => {
        const docRef = doc(db, "uploadedFile", field);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            setFile(docSnap.data())
        } else {
            console.log("No such document!");
        }
    };

    return (
        <div>
            <div>
                {/* <FileInfo fileData={file}/> */}
                <FileShareForm fileData={file} onSave={onSave()}/>
            </div>

        </div>
    );
}

export default FilePreview;
