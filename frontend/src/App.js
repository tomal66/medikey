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
import { useLocation } from 'react-router-dom';
import AddHospital from './Admin/AddHospital';
import AllHospitals from './Admin/AllHospitals';
import AllHospitalsTable from './Admin/AllHospitalsTable';
import HospitalDashboard from './Hospital/HospitalDashboard';
import AddDoctor from './Hospital/AddDoctor';
import AllDoctors from './Hospital/AllDoctors';
import AddMP from './Hospital/AddMP';
import AllMPs from './Hospital/AllMPs';
import DoctorDashboard from './Doctor/DoctorDashboard';
import Consultation from './Doctor/Consultation';


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
          <Route path="*" element={<ErrorPage/>}/>

          {/* Admin Dashboard */}
          <Route path="/admin-dashboard" element={<AdminDashboard/>}/>
          <Route path="/add-hospital" element={<AddHospital/>}/>
          <Route path="/all-hospitals" element={<AllHospitals/>}/>

          {/* Hospital Dashboard */}
          <Route path = "/hospital-dashboard" element={<HospitalDashboard/>}/>
          <Route path = "/add-doctor" element={<AddDoctor/>}/>
          <Route path = "/all-doctors" element={<AllDoctors/>}/>
          <Route path = "/add-mp" element={<AddMP/>}/>
          <Route path = "/all-mp" element={<AllMPs/>}/>

          {/* Doctor Dashboard */}
          <Route path = "/doctor-dashboard" element={<DoctorDashboard/>}/>
          <Route path = "/consult/:id" element={<Consultation/>}/>
          

          {/* <Route element={<RequireAuth allowedRole={"ROLE_USER"} />}>
            <Route path="/cart" element={<Cart/>}/>
            <Route path="/checkout" element={<Checkout/>}/>
            <Route path="/myOrders" element={<UserOrders/>}/>
            <Route path="/edit-user-profile" element={<EditProfile/>}/>
            <Route path="/edit-user-address" element={<EditAddress/>}/>
          </Route>

          <Route element={<RequireAuth allowedRole={"ROLE_SELLER"} />}>
            <Route path="/seller-dashboard" element={<SellerDashboard />} />
            <Route path="/my-products" element={<MyProducts />} />
            <Route path="/add-products" element={<AddProduct />} />
            <Route path="/edit-product/:id" element={<EditProduct />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/edit-seller-profile" element={<EditProfile/>}/>
            <Route path="/edit-seller-address" element={<EditAddress/>}/>
          </Route>

          <Route element={<RequireAuth allowedRole={"ROLE_ADMIN"} />}>
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/allProducts" element={<AllProducts />} />
            <Route path="/allOrders" element={<AllOrders />} />
          </Route> */}

        </Route>
          
        </Routes>
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
        <Footer/>
      </Router>
    </ThemeProvider>
   );
}

export default App;
