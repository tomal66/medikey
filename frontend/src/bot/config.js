// in config.js
import { createChatBotMessage } from 'react-chatbot-kit';


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
  },
  customComponents: {
    header: () => <div className="react-chatbot-kit-chat-header">MediKey Appointment Assistant</div>,
    botAvatar: (props) => <img alt="chatbot" className="react-chatbot-kit-chat-bot-avatar-container"
        src="images/botlogo.png" width="40px" height="40px" />,

},
};

export default config;