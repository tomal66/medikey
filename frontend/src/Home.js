import React, { useEffect, useContext, useState } from 'react';
import { ChatbotContext } from './context/ChatBotContext'; // Import the ChatbotContext
import HeroSection from './component/HeroSection';
import { useNavigate } from 'react-router-dom';
import Chatbot from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css';
import config from './bot/config.js';
import MessageParser from './bot/MessageParser.js';
import ActionProvider from './bot/ActionProvider.js';

const Home = () => {
  const nav = useNavigate();
  const isAuthenticated = false;
  const role = "";
  const { response, sendMessage } = useContext(ChatbotContext); // Use the ChatbotContext
  const [message, setMessage] = useState(''); // Local state to handle message input

  useEffect(() => {
    document.title = "MediKey";
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      if(role==="ROLE_SELLER") {
        nav("/seller-dashboard");
      } else if(role==="ROLE_ADMIN"){
        nav("/admin-dashboard");
      } else{
        nav("/");
      }
    }
  }, [isAuthenticated, nav, role]);

  const handleSend = () => {
    sendMessage(message); // Send the message when handleSend is called
    setMessage(''); // Clear the message input field
  };

  const data = {
    name: "MediKey",
  };

  return (
    <>
      <HeroSection myData={data} />     
      <Chatbot
        config={config}
        messageParser={MessageParser}
        actionProvider={ActionProvider}
      />
    </>
  );
};

export default Home;
