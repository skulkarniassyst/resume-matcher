import React, { useState }  from 'react';
import './Layout.css';
import axios from "axios";

const Layout: React.FC = () => {
  const [resumes, setResumes] = useState<FileList | null>(null);
  const [jobDescription, setJobDescription] = useState<string>('');
  const [results, setResults] = useState<any>(null);
  const [comparisonResult, setComparisonResult] = useState<any>(null);


  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
        setResumes(e.target.files);
    }
  };

  const handleJobDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJobDescription(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resumes || jobDescription.trim() === "") {
      alert("Please upload both resumes and job description.");
      return;
    }

    const formData = new FormData();
    for (let i = 0; i < resumes.length; i++) {
        formData.append("resumes", resumes[i]);
    }
    formData.append('jobDescription', jobDescription);




    try {
        const response = await axios.post(
          "http://localhost:5000/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setResults(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error:", error);
      }

  };


  return (
    <>
      <div className="header">
        Assyst Resume Scanner
      </div>
      <div className="container">
        <div className="box">
          <h2>Upload Resume</h2>
          <input type="file" multiple onChange={handleResumeChange} />
        </div>
        <div className="box">
          <h2>Job Description</h2>
          <textarea 
            placeholder="Type the job description here..." 
            value={jobDescription} 
            onChange={handleJobDescriptionChange}></textarea>
        </div>
        <div className="box">
          <h2>Results</h2>
          <div className="results">
            {results && <pre>{JSON.stringify(results, null, 2)}</pre>}
          </div>
        </div>
      </div>
      <div className="submit-button-container">
        <button className="submit-button" onClick={handleSubmit}>Submit</button>
      </div>
    </>
  );
};

export default Layout;
