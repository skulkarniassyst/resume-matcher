import React, { useState } from 'react';
import axios from 'axios';
import './Chatbot.css';

interface Message {
  text: string;
  sender: 'user' | 'bot';
}

interface ChatbotProps {
  resumeText: string;
}

const Chatbot: React.FC<ChatbotProps> = ({ resumeText }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');

  const handleSend = async () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: 'user' }]);
      setInput('');
  
      try {
        // Sending the request to the backend
        const response = await axios.post('http://localhost:5000/evaluate', {
          question: input,
          context: resumeText,  // Assuming you have the context stored somewhere
        });
        console.log("Sending request:", { question: input, context: resumeText });
        
        console.log("Received response:", response.data);  // Debugging line
  
        // Assuming response.data contains the answer
        const answer = response.data.answer;
  
        if (answer.length < 3 || answer.includes("[CLS]") || answer.includes("Sorry")) {
          setMessages((prevMessages) => [...prevMessages, { text: "I couldn't find a confident answer. Could you provide another question?", sender: 'bot' }]);
        } else {
          setMessages((prevMessages) => [...prevMessages, { text: answer, sender: 'bot' }]);
        }      
      } catch (error) {
        console.error("Error during API call:", error);
        setMessages((prevMessages) => [...prevMessages, { text: "Sorry, something went wrong.", sender: 'bot' }]);
      }
    }
  };
  
  return (
    <div className="chatbot-overlay">
      <div className="chatbot">
        <div className="chat-window">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.sender}`}>
              {msg.text}
            </div>
          ))}
        </div>
        <div className="input-area">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />
          <button onClick={handleSend}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
