import React, { useState, useEffect} from 'react';
import './App.css';
import Layout from './Layout';
import Chatbot from './Chatbot';

const App: React.FC = () => {
  const [showChatbot, setShowChatbot] = useState(false);
  const [resumeText, setResumeText] = useState<string | null>(null);

  const toggleChatbot = () => {
    setShowChatbot(!showChatbot);
  };

  useEffect(() => {
    console.log('resumeText updated:', resumeText);
  }, [resumeText]);
  

  return (
    <div className="App">
      <Layout setResumeText={setResumeText} />
      {showChatbot && resumeText && <Chatbot resumeText={resumeText} />}
      <button className="chatbot-toggle" onClick={toggleChatbot}>
        Chat
      </button>
    </div>
  );
};

export default App;
