import { AppBar, Toolbar, IconButton, Typography, Stack, Button } from "@mui/material"
import Logo from "./Logo"
import { NavLink } from "react-router-dom"


const MuiNavBar = ({toggleChatbot}) => {
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
                <NavLink to="/">
                    <Button  sx={{fontSize: '18px', color:'#255a99'}} >Home</Button>
                </NavLink>
                <NavLink to="/make-appointment">
                    <Button  sx={{fontSize: '18px', color:'#255a99'}} >Make Appointment</Button>
                </NavLink>
                <Button  sx={{fontSize: '18px', color:'#255a99'}} onClick={toggleChatbot}>Assist</Button>
                <NavLink to="/login">
                    <Button  sx={{fontSize: '15px', backgroundColor:'#3d96ff'}} variant='contained'>Login</Button>
                </NavLink>
                
            </Stack>
        </Toolbar>
    </AppBar>
  )
}

export default MuiNavBar