// import React from 'react'
// import { useState, useEffect } from 'react'
// import axios from 'axios'
// import './App.css'

// const App: React.FC = () => {
//   const [message, setMessage] = useState<string>('');
//   const [message1, setMessage1] = useState<string>('');


//   useEffect(() => {
//     axios.get('http://127.0.0.1:5000/')
//       .then(response => {
//         setMessage(response.data);
//       })
//       .catch(error => {
//         console.error('There was an error', error);
//       });
//   }, []);

//   useEffect(() => {
//     axios.get('http://127.0.0.1:5000/es-test')
//       .then(response => {
//         setMessage1(response.data);
//       })
//       .catch(error => {
//         console.error('There was an error', error);
//       });
//   }, []);

//   return (
//     <div className="App">
//       <h1>Resume Matcher</h1>
//       <p>{message}</p>
//       <p>{message1}</p>
//     </div>
//   )
// }

// export default App


import React, { useState } from "react";
import "./App.css";
import axios from "axios";

const App: React.FC = () => {
  const [resumes, setResumes] = useState<FileList | null>(null);
  const [jobDescription, setJobDescription] = useState<File | null>(null);

  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setResumes(e.target.files);
  };

  const handleJobDescriptionChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setJobDescription(e.target.files ? e.target.files[0] : null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resumes || !jobDescription) {
      alert("Please upload both resumes and job description.");
      return;
    }

    const formData = new FormData();
    for (let i = 0; i < resumes.length; i++) {
      formData.append("resumes", resumes[i]);
    }
    formData.append("jobDescription", jobDescription);

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
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <h1>Resume Scanner Application</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Upload Resumes:</label>
          <input type="file" multiple onChange={handleResumeChange} />
        </div>
        <div>
          <label>Upload Job Description:</label>
          <input type="file" onChange={handleJobDescriptionChange} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default App;