import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "./context/auth_context";
import Loading from "./style/Loading";


const RequireAuth = ({ allowedRole }) => {
    const { role, stateRestored } = useAuthContext();
    const location = useLocation();
    console.log(role);
    console.log(allowedRole);
 
    if(!stateRestored)
    {
      return <Loading/>;
    }
    
    else if (allowedRole === role) {
        return <Outlet />;
      } else {
        return <Navigate to="/unauthorized" state={{ from: location }} replace/>;
      }
}

export default RequireAuth;