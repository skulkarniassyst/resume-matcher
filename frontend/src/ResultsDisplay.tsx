import React from 'react';
import './ResultsDisplay.css';

interface ResultsDisplayProps {
  text: string;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ text }) => {
  return (
    <div className="results-display">
      {text.split('\n').map((line, index) => (
        <p key={index} className="results-line">{line}</p>
      ))}
    </div>
  );
};

export default ResultsDisplay;
