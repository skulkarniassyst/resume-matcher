// import React, { useState } from "react";
// import "./App.css";
// import axios from "axios";

// const App: React.FC = () => {
//   const [resumes, setResumes] = useState<FileList | null>(null);
//   const [jobDescription, setJobDescription] = useState<string>('');
//   const [topX, setTopX] = useState<number | null>(3);
//   const [result, setResult] = useState<any>(null);

//   const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setResumes(e.target.files);
//   };

//   const handleJobDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setJobDescription(e.target.value);
//   };

//   const handleTopXChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setTopX(Number(e.target.value));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!resumes || jobDescription.trim() === "") {
//       alert("Please upload both resumes and job description.");
//       return;
//     }

//     const formData = new FormData();
//     for (let i = 0; i < resumes.length; i++) {
//       formData.append("resumes", resumes[i]);
//     }
//     formData.append("jobDescription", jobDescription);

//     try {
//       const response = await axios.post(
//         "http://localhost:5000/upload",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//       setResult(response.data);
//       console.log(response.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div className="App">
//       <h1>Resume Scanner Application</h1>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Upload Resumes:</label>
//           <input type="file" multiple onChange={handleResumeChange} />
//         </div>
//         <div>
//           <label>Upload Job Description:</label>
//           <input 
//             type="text"
//             value={jobDescription}
//             onChange={handleJobDescriptionChange}
//           />
//         </div>
//         <div>
//           <label>Number of Candidates: </label>
//           <input
//             type="number"
//             placeholder="Enter"
//             value={topX ?? ''}
//             min="0"
//             onChange={handleTopXChange}
//           />
//         </div>
//         <button type="submit">Submit</button>
//       </form>
//       {result && (
//         <div>
//           <h2>Parsed Information</h2>
//           <h3>Resumes:</h3>
//           <pre>{JSON.stringify(result.resumes, null, 2)}</pre>
//           <h3>Job Description:</h3>
//           <pre>{JSON.stringify(result.job_description, null, 2)}</pre>
//         </div>
//       )}
//     </div>
//   );
// };

// export default App;
import React from 'react';
import Layout from './Layout';

const App: React.FC = () => {
  return (
    <div className="App">
      <Layout />
    </div>
  );
};

export default App;
