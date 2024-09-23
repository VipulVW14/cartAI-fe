import React, { useState } from 'react';
import Vapi from "@vapi-ai/web";

const vapi = new Vapi("708057be-3439-4ca7-8fb2-1d27b7e2a13e");

const AIAssistant = () => {
  const [isListening, setIsListening] = useState(false);

  const handleStart = () => {
    setIsListening(true);
    vapi.start("0e2cea8c-2315-4c18-8e0f-bcf85f2df271");
  };

  const handleStop = () => {
    setIsListening(false);
    vapi.stop();
  };

  return (
    <div className="bg-gray-100 p-4 mb-2 md:m-4 md:py-60 md:min-h-[700px] text-center rounded-lg border-2">
      <div className='flex justify-center'>
      <img className="w-8 h-8 rounded-md mx-2" src="https://i.postimg.cc/K8QFJGFw/1705389198122.jpg" alt="logo" /> 
      <h2 className="text-2xl font-bold mb-5">AI Voice Assistant</h2>
      </div>
      <button
        onClick={handleStart}
        className={`transition-transform duration-150 ease-in-out ${isListening ? 'bg-green-500' : 'bg-blue-500 hover:bg-blue-600'} text-white text-center px-4 py-2 rounded-lg mr-2`}
      >
        {isListening ? 'Listening...' : 'Start'}
      </button>
      <button
        onClick={handleStop}
        className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
      >
        Stop 
      </button>
    </div>
  );
};

export default AIAssistant;
