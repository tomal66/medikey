import React, { useEffect, useContext, useState } from 'react';
import { ChatbotContext } from './context/ChatBotContext'; // Import the ChatbotContext
import HeroSection from './component/HeroSection';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

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
    <Wrapper>
      <HeroSection myData={data} />     
    </Wrapper>
  );
};
const Wrapper = styled.div`
  min-height: 70vh;
  background-color: "#FFFFFF";
`;


export default Home;
