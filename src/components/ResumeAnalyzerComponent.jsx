import React, { useState } from "react";
import { uploadResume } from "../API/ImageUpload";
import "../Scss/ResumeAnalyzerComponent.scss";
import { toast } from "react-toastify";

export default function ResumeAnalyzerComponent({ currentUser }) {
    const [resume, setResume] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        setResume(file);
    };

    const handleSubmit = async () => {
        if (!resume) {
            toast.info("Please select a resume file");
            return;
        }

        try {
            uploadResume(resume, currentUser?.userid, setUploadProgress);
            toast.success("Resume uploaded successfully");
        } catch (error) {
            console.error("Error uploading resume:", error);
            toast.error("An error occurred while uploading the resume");
        }
    };

    return (
        <div className='resume-analyzer-container'>
            <h1>Resume Analyzer</h1>
            <label htmlFor='file-upload' className='file-input-label'>
                Select Resume
            </label>
            <input
                id='file-upload'
                type='file'
                onChange={handleFileUpload}
                accept='.pdf,.doc,.docx'
            />
            {resume && (
                <div className='file-info'>
                    <p>File Name: {resume.name}</p>
                    {uploadProgress > 0 && uploadProgress < 100 && (
                        <div className='progress-container'>
                            <div
                                className='progress-bar'
                                style={{ width: `${uploadProgress}%` }}
                            />
                            <p className='progress-percentage'>
                                {uploadProgress}%
                            </p>
                        </div>
                    )}
                </div>
            )}
            <button className='upload-button' onClick={handleSubmit}>
                Upload Resume
            </button>
        </div>
    );
}
