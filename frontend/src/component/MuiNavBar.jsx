import { AppBar, Toolbar, IconButton, Typography, Stack, Button } from "@mui/material"
import Logo from "./Logo"
import { NavLink } from "react-router-dom"


const MuiNavBar = ({toggleChatbot}) => {
  return (
    <AppBar component='nav' position='static' sx={{background: '#ecf5ff'}}>
        <Toolbar>
            <NavLink to="/">
                <IconButton size='large' edge='start' aria-label='logo' sx={{marginLeft: "1rem"}}>
                    <Logo color="#3d96ff" size="45px" />
                </IconButton>
            </NavLink>
            <Typography variant='h5' component='div' sx={{flexGrow: 1, color:"#3d96ff", fontWeight: 'bold', fontSize:'3rem'}}> 
                MediKey
            </Typography>
            <Stack direction='row' spacing={2}>
                <NavLink to="/">
                    <Button  sx={{fontSize: '1.8rem', color:'#255a99'}} >Home</Button>
                </NavLink>
                <Button  sx={{fontSize: '1.8rem', color:'#255a99'}} onClick={toggleChatbot}>Make Appointment</Button>
                <NavLink to="/login">
                    <Button  sx={{fontSize: '1.5rem', backgroundColor:'#3d96ff'}} variant='contained'>Login</Button>
                </NavLink>
                
            </Stack>
        </Toolbar>
    </AppBar>
  )
}

export default MuiNavBar