import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ChatbotProvider } from './context/ChatBotContext';
import { AuthProvider } from './context/auth_context';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <ChatbotProvider>
//       <App />
//     </ChatbotProvider>
//   </React.StrictMode>
// );

ReactDOM.render(
  <React.StrictMode>
    <ChatbotProvider>
      <AuthProvider>      
      <App />
      </AuthProvider>
    </ChatbotProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
