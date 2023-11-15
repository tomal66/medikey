import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import ErrorPage from './ErrorPage';
import { GlobalStyle } from './GlobalStyle';
import { ThemeProvider } from 'styled-components';
import Header from './component/Header';
import Footer from './component/Footer';
import config from './bot/config.js';
import MessageParser from './bot/MessageParser.js';
import ActionProvider from './bot/ActionProvider.js';
import Chatbot from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css';
import Layout from './component/Layout';
import Button from 'react-bootstrap/Button';
import React, { useState, useEffect } from 'react';
import Login from './Login.js';
import Register from './Register.js'
import AdminDashboard from './Admin/AdminDashboard';
import AddHospital from './Admin/AddHospital';
import AllHospitals from './Admin/AllHospitals';
import HospitalDashboard from './Hospital/HospitalDashboard';
import AddDoctor from './Hospital/AddDoctor';
import AllDoctors from './Hospital/AllDoctors';
import AddMP from './Hospital/AddMP';
import AllMPs from './Hospital/AllMPs';
import DoctorDashboard from './Doctor/DoctorDashboard';
import Consultation from './Doctor/Consultation';
import MakeAppointment from './MakeAppointment';
import PatientDashboard from './Patient/PatientDashboard.js'
import PatientForm from './PatientForm';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { useAuthContext } from './context/auth_context';
import MPDashboard from './Staff/MPDashboard.js';
import TakeHistory from './Staff/TakeHistory.js';
import Appointments from './Staff/Appointments.js';
import AddTest from './Staff/AddTest.js';
import EditHospital from './Admin/EditHospital.js';
import EditDoctor from './Hospital/EditDoctor.js';
import EditMP from './Hospital/EditMP.js';
import ChangePassword from './ChangePassword.js';
import AppointmentList from './Doctor/AppointmentList.js';
import MyHistory from './Patient/MyHistory.js';
import MyTest from './Patient/MyTest.js';
import EditProfile from './Patient/EditProfile.js';
import Unauthorized from './Unauthorized.js';
import RequireAuth from './RequireAuth.js';

function App() {
  
  const theme = {
    colors: {
      heading: "rgb(24 24 29)",
      text: "rgba(29 ,29, 29, .8)",
      white: "#fff",
      black: " #212529",
      helper: "#3D96FF",

      bg: "#F6F8FA",
      footer_bg: "#0a1435",
      btn: "#3D96FF",
      border: "#3D96FF",
      hr: "#ffffff",
      gradient:
        "linear-gradient(0deg, rgb(132 144 255) 0%, rgb(98 189 252) 100%)",
      shadow:
        "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;",
      shadowSupport: " rgba(0, 0, 0, 0.16) 0px 1px 4px",
    },
    media: {
      mobile: "768px",
      tab: "998px",
    },
  };

  const [chatbotActive, setChatbotActive] = useState(false);
  const { role } = useAuthContext();  

  const toggleChatbot = () => {
    setChatbotActive(!chatbotActive);
  };

  const handleClickOutside = event => {
    const chatbot = document.querySelector('.chatbot');
    const botBtn = document.querySelector('.bot-btn');
    if (chatbot && !chatbot.contains(event.target) && !botBtn.contains(event.target)) {
      setChatbotActive(false);
    }
  };
  

  useEffect(() => {
    // Add an event listener to listen for clicks on the page
    document.addEventListener('mousedown', handleClickOutside);

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return ( 
    <>
    <ToastContainer />
      
    <ThemeProvider theme={theme}>
      
      <Router>
        <GlobalStyle/>
        <Header  toggleChatbot={toggleChatbot}/>
        <Routes>
        <Route path="/" element={<Layout />}>
 
          {/* Public Routes */}
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/make-appointment" element={<MakeAppointment/>}/>
          <Route path="/unauthorized" element={<Unauthorized/>}/>
          <Route path="*" element={<ErrorPage/>}/>

          {/* Admin Dashboard */}
          <Route element={<RequireAuth allowedRole={"ROLE_ADMIN"} />}>
            <Route path="/admin-dashboard" element={<AdminDashboard/>}/>
            <Route path="/add-hospital" element={<AddHospital/>}/>
            <Route path="/all-hospitals" element={<AllHospitals/>}/>
            <Route path="/edit-hospital/:id" element={<EditHospital/>}/>
          </Route>

          {/* Hospital Dashboard */}
          <Route element={<RequireAuth allowedRole={"ROLE_HOSPITAL"} />}>
            <Route path = "/hospital-dashboard" element={<HospitalDashboard/>}/>
            <Route path = "/add-doctor" element={<AddDoctor/>}/>
            <Route path = "/all-doctors" element={<AllDoctors/>}/>
            <Route path="/edit-doctor/:id" element={<EditDoctor/>}/>
            <Route path = "/add-mp" element={<AddMP/>}/>
            <Route path = "/all-mp" element={<AllMPs/>}/>
            <Route path="/edit-staff/:id" element={<EditMP/>}/>
            <Route path="/change-password" element={<ChangePassword/>}/>
          </Route>

          {/* Doctor Dashboard */}
          <Route element={<RequireAuth allowedRole={"ROLE_DOCTOR"} />}>
            <Route path = "/doctor-dashboard" element={<DoctorDashboard/>}/>
            <Route path = "/consult/:id/:code" element={<Consultation/>}/>
            <Route path="/change-password" element={<ChangePassword/>}/>
            <Route path="/doctor-appointments" element={<AppointmentList/>}/>
          </Route>

          {/* Patient Dashboard */}
          <Route element={<RequireAuth allowedRole={"ROLE_PATIENT"} />}>
            <Route path = "/patient-dashboard" element={<PatientDashboard/>}/>
            <Route path = "/patient-form" element={<PatientForm/>}/>
            <Route path="/change-password" element={<ChangePassword/>}/>
            <Route path="/my-history" element={<MyHistory/>}/>
            <Route path="/my-test" element={<MyTest/>}/>
            <Route path="/edit-profile" element={<EditProfile/>}/>
          </Route>

          {/* Staff Dashboard */}
          <Route element={<RequireAuth allowedRole={"ROLE_STAFF"} />}>
            <Route path = "/mp-dashboard" element={<MPDashboard/>}/>
            <Route path = "/take-history/:id/:code" element={<TakeHistory/>}/>
            <Route path = "/appointments" element={<Appointments/>}/>
            <Route path = "/add-test" element={<AddTest/>}/>
            <Route path="/change-password" element={<ChangePassword/>}/>
          </Route>
          
        </Route>
          
        </Routes>
        {/* Conditionally render chatbot and chatbot button based on role */}
        {(role === "ROLE_PATIENT" || role === null) && (
          <>
            <div className={`chatbot ${chatbotActive ? 'active' : ''}`}>
              {chatbotActive && (
                <Chatbot
                  config={config}
                  messageParser={MessageParser}
                  actionProvider={ActionProvider}
                />
              )}
            </div>
            <Button className="bot-btn" onClick={toggleChatbot}>&nbsp;</Button>
          </>
        )}
        <Footer/>
      </Router>
    </ThemeProvider>
    </>
   );
}

export default App;
