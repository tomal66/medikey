import React from 'react';
import HeroSection from './component/HeroSection';
//import HomeCategories from './components/HomeCategories';
//import HomeSeller from './components/HomeSeller';
//import FeaturedProducts from './components/FeaturedProducts';
import { useEffect } from 'react';
//import { useAuthContext } from './context/auth_context';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  //const { isAuthenticated, role } = useAuthContext();
  const nav = useNavigate();
  //const location = useGeoLocation();
  const isAuthenticated = false;
  const role = "";
  
  useEffect(() => {
    document.title = "MediKey";
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      if(role==="ROLE_SELLER")
      {
        nav("/seller-dashboard");
      }
      else if(role==="ROLE_ADMIN"){
        nav("/admin-dashboard");
      }
      else{
        nav("/");
      }

    }
  }, [isAuthenticated, nav]);



  const data = {
    name: "MediKey",
  };

  return (
    <>
      <HeroSection myData={data} />
      {/* <FeaturedProducts />
      <HomeCategories />
      {!isAuthenticated && <HomeSeller />} */}
    </>
  );
};

export default Home;
