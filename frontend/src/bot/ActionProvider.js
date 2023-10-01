// in ActionProvider.jsx
import React, {useContext} from 'react';
import { ChatbotContext } from '../context/ChatBotContext';

const ActionProvider = ({ createChatBotMessage, setState, children }) => {

  const { sendMessage, response, department, setDepartment } = useContext(ChatbotContext);

  const handleHello = () => {
    const botMessage = createChatBotMessage('Hello. Nice to meet you.');
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const handleSendMessage = async (message) => {
    const response = await sendMessage(message); // get the response here
    if (response && response.length > 0) {
      console.log(response);
      const messages = response.map((msg) => createChatBotMessage(msg)); // map each response to a botMessage
      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, ...messages], // spread messages here
      }));
      // Check if the response contains department information
      const departmentMessage = response.find(msg => msg.includes('you need to see someone from'));
      if (departmentMessage) {
        let department = departmentMessage.split('you need to see someone from ')[1];
        department = department.split('.').join("").toLowerCase();
        setDepartment(department); // set the department in the state
        const buttonMessage = createChatBotMessage("Would you like to make an appointment?", {
          widget: "MakeAppointmentButton",
        });
        setState((prev) => ({
          ...prev,
          messages: [...prev.messages, buttonMessage],
        }));
      }

    }
  };

  // Put the handleHello function in the actions object to pass to the MessageParser
  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {
            handleHello,
            handleSendMessage,
          },
        });
      })}
    </div>
  );
};

export default ActionProvider;
