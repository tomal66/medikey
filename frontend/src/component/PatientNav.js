import { AppBar, Toolbar, IconButton, Typography, Stack, Button } from "@mui/material"
import Logo from "./Logo"
import { NavLink } from "react-router-dom"
import { useAuthContext } from "../context/auth_context"
import { useNavigate } from "react-router-dom"


const PatientNav = ({toggleChatbot}) => {
    const { isAuthenticated, logout } = useAuthContext();
    const nav = useNavigate();
    
    return (
        <AppBar component='nav' position='static' sx={{background: '#eff6fa'}}>
            <Toolbar>
                <NavLink to="/">
                    <IconButton size='large' edge='start' aria-label='logo' sx={{marginLeft: "10px"}}>
                        <Logo color="#3d96ff" size="45px" />
                    </IconButton>
                </NavLink>
                <Typography variant='h5' component='div' sx={{flexGrow: 1, color:"#3d96ff", fontWeight: 'bold', fontSize:'30px'}}> 
                    MediKey
                </Typography>
                <Stack direction='row' spacing={2}>
                    <NavLink to="/patient-dashboard">
                        <Button  sx={{fontSize: '18px', color:'#255a99'}} >Dashboard</Button>
                    </NavLink>
                    <NavLink to="/make-appointment">
                        <Button  sx={{fontSize: '18px', color:'#255a99'}} >Make Appointment</Button>
                    </NavLink>
                    
                    {isAuthenticated ? (
                        <Button sx={{ fontSize: '15px', backgroundColor: '#3d96ff' }} variant='contained'
                         onClick={() => {
                            logout();
                            nav("/");
                          }}>Logout</Button>
                    ) : (
                        <NavLink to="/login">
                        <Button sx={{ fontSize: '15px', backgroundColor: '#3d96ff' }} variant='contained'>Login</Button>
                        </NavLink>
                    )}
                    
                </Stack>
            </Toolbar>
        </AppBar>
    )
}

export default PatientNav