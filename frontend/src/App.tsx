import React, { useState } from 'react';
import './App.css';
import Layout from './Layout';
import Chatbot from './Chatbot';



const App: React.FC = () => {

  const [showChatbot, setShowChatbot] = useState(false);

  const toggleChatbot = () => {
    setShowChatbot(!showChatbot);
  };

  return (
    <div className="App">
      <Layout />
      {showChatbot && <Chatbot />}
        <button className="chatbot-toggle" onClick={toggleChatbot}>
          Chat
        </button>
    </div>
  );
};

export default App;
