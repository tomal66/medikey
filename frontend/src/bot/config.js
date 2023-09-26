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
};

export default config;