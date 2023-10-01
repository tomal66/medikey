const authReducer = (state, action) => {
    switch (action.type) {
      case "LOGIN":
        localStorage.setItem("accessToken", action.payload.accessToken);
        return {
          ...state,
          isAuthenticated: true,
          username: action.payload.username,
          role: action.payload.role,
          error: null,
        };

        // isAuthenticated: false,
        // user: null,
        // error: null,
        // role: null,
        // stateRestored: false,

      case "LOGOUT":
        localStorage.removeItem("accessToken");
        return {
          ...state,
          isAuthenticated: false,
          role: null,
          username: null,
        };
      
      case "RESTORE_STATE":
        return action.payload;

      case "STATE_RESTORED":
      return {
        ...state,
        stateRestored: true,
      };

      case "AUTH_ERROR":
        localStorage.setItem("accessToken", null);
        return {
          ...state,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default authReducer;
  