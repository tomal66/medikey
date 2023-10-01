// ChatbotContext.js
import React, { createContext, useState } from 'react';

export const ChatbotContext = createContext();

export const ChatbotProvider = ({ children }) => {
  const [response, setResponse] = useState([]);
  const [department, setDepartment] = useState(null);

  const sendMessage = async (message) => {
    const responseFromServer = await fetch('http://localhost:8567/api/chatbot/sendMessage', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userInput: message }),
    }).then(res => res.json());

    setResponse(responseFromServer);
    return responseFromServer; // return the response here
  };

  // const sendMessage = async (userInput) => {
  //   console.log(userInput)
  //   try {
  //     const response = await fetch('http://localhost:8567/api/chatbot/sendMessage', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ userInput }),
  //     });

  //     const responseData = await response.json();
  //     setResponse(responseData);
  //     //console.log(responseData)
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <ChatbotContext.Provider value={{ response, sendMessage, department, setDepartment }}>
      {children}
    </ChatbotContext.Provider>

  );
};
