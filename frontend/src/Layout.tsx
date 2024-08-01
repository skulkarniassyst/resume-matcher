import React, { useState, useRef }  from 'react';
import './Layout.css';
import axios from "axios";
import ResultsDisplay from './ResultsDisplay';
import LoadingSpinner from './LoadingSpinner';
import UploadedResumes from './UploadedResumes'; 


const Layout: React.FC = () => {
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [resumes, setResumes] = useState<File[]>([]);
  const [jobDescription, setJobDescription] = useState<string>('');
  const [comparisonResult, setComparisonResult] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [initialMessage, setInitialMessage] = useState<string>("Results will display here");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFiles(e.target.files);
    }
  };

  const handleAddFiles = () => {
    if (selectedFiles) {
      setResumes((prevResumes) => [...prevResumes, ...Array.from(selectedFiles)]);
      setSelectedFiles(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = ''; 
      }
    }
  };

  const handleJobDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJobDescription(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (resumes.length === 0 || jobDescription.trim() === "") {
      alert("Please upload both resumes and job description.");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("resumes", resumes[0]); // Handle only one resume for now
    formData.append('jobDescription', jobDescription);
  
    try {
        // First API call to upload the resume and job description
        const response = await axios.post("http://localhost:5000/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data; charset=utf-8",
          },
        });
  
        const resumeText: string = response.data.resume;
        const jobDescriptionText: string = response.data.jd;
  

        console.log("Resume Text:", resumeText);
        console.log("Job Description Text:", jobDescriptionText);

        // Second API call to the comparison endpoint
        const comparisonResponse = await axios.post("https://10.10.10.29:8000/compare_resume_with_jd/", {
          resume: resumeText,
          jd: jobDescriptionText,
        });
  
        setComparisonResult(comparisonResponse.data);

        console.log("result:", comparisonResponse.data);
      } catch (error) {
        console.error("Error:", error);
        setInitialMessage("Failed to retrieve comparison results. Please try again.");
      }finally {
        setLoading(false); // Set loading to false after the API call completes
      }
  };

  const handleClearResumes = () => {
    setResumes([]);
  };

  const handleRemoveResume = (index: number) => {
    const updatedResumes = resumes.filter((_, i) => i !== index);
    setResumes(updatedResumes);
  };
  

  return (
    <>
      <div className="header">
        ASSYST Resume Scanner
      </div>
      <div className="container">
        <div className="box">
          <h2>Upload Resume</h2>
          <input name="upload-resume" type="file" multiple onChange={handleFileChange} ref={fileInputRef} />
          <button onClick={handleAddFiles}>Add File(s)</button>
          <button onClick={handleClearResumes}>Clear Resumes</button>
          <UploadedResumes 
            resumes={resumes} 
            handleRemoveResume={handleRemoveResume} 
          />
        </div>
        <div className="box">
          <h2>Job Description</h2>
          <textarea 
            name="job-description"
            placeholder="Type the job description here..." 
            value={jobDescription} 
            onChange={handleJobDescriptionChange}></textarea>
        </div>
        <div className="box">
          <h2>Results</h2>
            {loading && <LoadingSpinner />}
            {!loading && comparisonResult && <ResultsDisplay text={comparisonResult} />}
            {!loading && !comparisonResult && <p className="placeholder">{initialMessage}</p>}         
        </div>
      </div>
      <div className="submit-button-container">
        <button className="submit-button" onClick={handleSubmit}>Submit</button>
      </div>
    </>
  );

};

export default Layout;
