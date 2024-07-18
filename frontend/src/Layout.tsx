import React from 'react';
import './Layout.css';

const Layout: React.FC = () => {
  return (
    <>
      <div className="header">
        Assyst Resume Scanner
      </div>
      <div className="container">
        <div className="box">
          <h2>Upload Resume</h2>
          <input type="file" multiple />
        </div>
        <div className="box">
          <h2>Job Description</h2>
          <textarea placeholder="Type the job description here..."></textarea>
        </div>
        <div className="box">
          <h2>Results</h2>
          <div className="results">
            {/* Results will be displayed here */}
          </div>
        </div>
      </div>
      <div className="submit-button-container">
        <button className="submit-button">Submit</button>
      </div>
    </>
  );
};

export default Layout;
