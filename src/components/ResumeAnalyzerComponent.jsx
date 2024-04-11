import React, { useState } from "react";
import { storage } from "../FirebaseConfig";
import { addResume } from "../API/FirestoreAPI";
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
      const storageRef = storage.ref();
      const resumeRef = storageRef.child(`resumes/${resume.name}`);

      const uploadTask = resumeRef.put(resume);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(Math.round(progress));
        },
        (error) => {
          console.error("Error uploading resume:", error);
          toast.error("An error occurred while uploading the resume");
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then(async (downloadURL) => {
            await addResume({ name: resume.name, url: downloadURL });
            toast.success("Resume uploaded successfully");
            setResume(null);
            setUploadProgress(0);
          });
        }
      );
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
          <div className='progress-container'>
            <div
              className='progress-bar'
              style={{ width: `${uploadProgress}%` }}
            />
            <p className='progress-percentage'>{uploadProgress}%</p>
          </div>
        </div>
      )}
      <button className='upload-button' onClick={handleSubmit}>
        Upload Resume
      </button>
    </div>
  );
}
