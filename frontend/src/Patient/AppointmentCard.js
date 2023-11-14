import React from 'react'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import styled from 'styled-components';

const AppointmentCard = ({appointment}) => {
  return (
    <Card sx={{ maxWidth: 345, boxShadow: '0px 0px 3px rgba(0, 0, 0, 0.5)', borderRadius: 3, marginTop: 2  }}>
                    <CardActionArea>
                      <Grid container spacing={2}>
                        <Grid xs={7}>
                            <CardContent>
                                <Typography gutterBottom variant="h6" component="div">
                                    {appointment.doctorName}
                                </Typography>
                                <Typography variant="subtitle1" color="text.primary">
                                    {appointment.hospitalName}
                                </Typography>
                                <Typography variant="subtitle1" color="text.primary">
                                    {appointment.scheduledTime}
                                </Typography>
                                <Typography variant="subtitle1" color="text.primary">
                                    Current # {appointment.currentSl || ''}
                                </Typography>
                            </CardContent>
                        </Grid>

                        <Grid xs={5}>
                            <Container>
                                <Circle>{appointment.slNo}</Circle>
                            </Container>
                        </Grid>
                      
                      </Grid>
                      
                    </CardActionArea>
                  </Card>
  )
}

const Circle = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background-color: #44c244;
  border: 3px solid white; // White border
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5); // Shadow
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  color: white;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%; // Adjust as needed
`;


export default AppointmentCard