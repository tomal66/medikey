// in config.js
import { createChatBotMessage } from 'react-chatbot-kit';
import { useNavigate} from 'react-router-dom';
import { useContext } from 'react';
import { ChatbotContext } from '../context/ChatBotContext';
import styled from 'styled-components';



const botName = 'MediKeyBot';

const config = {
  initialMessages: [createChatBotMessage(`Hi! I'm ${botName}. I can help you making appointment. Try asking for help!`)],
  botName: botName,
  customStyles: {
    botMessageBox: {
      backgroundColor: '#3D96FF',
    },
    chatButton: {
      backgroundColor: '#3D96FF',
    },
  },///
  customComponents: {
    header: () => <div className="react-chatbot-kit-chat-header">MediKey Appointment Assistant</div>,
    botAvatar: (props) => <img alt="chatbot" className="react-chatbot-kit-chat-bot-avatar-container"
        src="images/botlogo.png" width="40px" height="40px"/>,

  },
  widgets: [
    {
      widgetName: "MakeAppointmentButton",
      widgetFunc: (props) => <MakeAppointmentButton {...props} />,
    },
  ],
};

const MakeAppointmentButton = () => {
  const navigate = useNavigate();
  const { department } = useContext(ChatbotContext);

  const handleClick = () => {
    navigate(`/make-appointment?department=${department}`);
  };

  return (
    <Button onClick={handleClick}>Make Appointment</Button>
  );
};

const Button = styled.button`
display: block;
width: 100%;
padding: 7.5px;
font-size: 18px;
color: ${({ theme }) => theme.colors.white};
background-color: ${({ theme }) => theme.colors.btn};
border: none;
border-radius: 3px;
cursor: pointer;
transition: all 0.3s ease;
-webkit-transition: all 0.3s ease 0s;
-moz-transition: all 0.3s ease 0s;
-o-transition: all 0.3s ease 0s;

&:hover,
&:active {
  box-shadow: 0 20px 20px 0 rgb(132 144 255 / 30%);
  box-shadow: ${({ theme }) => theme.colors.shadowSupport};
  transform: scale(0.96);
}

`;

export default config;