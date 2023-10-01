import axios from "axios";
import { createContext, useContext, useReducer, useEffect } from "react";
import authReducer from "../reducer/authReducer";

const AuthContext = createContext();

const API = "http://localhost:8080/api/auth/";

const inialState = {
  isAuthenticated: false,
  username: null,
  error: null,
  role: null,
  stateRestored: false,
};
 
const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, inialState);

  useEffect(() => {
    const storedState = JSON.parse(localStorage.getItem("authState"));
    if (storedState) {
      dispatch({ type: "RESTORE_STATE", payload: storedState });
    } 

    dispatch({ type: "STATE_RESTORED" });
    
  }, []);

  useEffect(() => {
    localStorage.setItem("authState", JSON.stringify(state));
  }, [state]);

  const register = async (username, firstname, lastname, password, mobile, email, role, address, zipcode, city, state, country, latitude, longitude) => {
    try {
      const response = await axios.post(API + "register", {
        username,
        firstname,
        lastname,
        password,
        mobile,
        email,
        role,
        address: {
          address: address,
          country: country,
          zipcode: zipcode,
          city: city,
          longitude: longitude,
          latitude: latitude,
          state: state
        }
      });
  
      if (response.data) {
        await login(username, password); // Add 'await' before calling login
      }
  
      return response.data;
    } catch (error) {
      console.log(error.response.data); // Log the error response data
      dispatch({ type: "AUTH_ERROR", payload: error });
    }
  };
  

  const login = async (username, password) => {
    try {
      const response = await axios.post(API + "login", {
        username,
        password,
      });

      if (response.data.accessToken) {
        dispatch({
          type: "LOGIN",
          payload: {
            username: response.data.username,
            accessToken: response.data.accessToken,
            role: response.data.role
          },
        });
      }

      return response.data;
    } catch (error) {
      console.log(error.response.data);
      dispatch({ type: "AUTH_ERROR", payload: error });
    }
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider value={{ ...state, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuthContext = () => {
  return useContext(AuthContext);
};

export { AuthProvider, AuthContext, useAuthContext };
