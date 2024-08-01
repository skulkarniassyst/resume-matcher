import React from 'react';
import './UploadedResumes.css';

interface UploadedResumesProps {
  resumes: File[];
  handleRemoveResume: (index: number) => void;
}

const UploadedResumes: React.FC<UploadedResumesProps> = ({ resumes, handleRemoveResume }) => {
  return (
    <div className="uploaded-resumes">
      <ul>
        {resumes.map((resume, index) => (
          <li key={index}>
            {resume.name}
            <button onClick={() => handleRemoveResume(index)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UploadedResumes;
