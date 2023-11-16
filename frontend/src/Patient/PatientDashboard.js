import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from "styled-components";
import { HiUserAdd } from "react-icons/hi";
import Grid from '@mui/material/Unstable_Grid2';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import AppointmentCard from './AppointmentCard';
import { useAuthContext } from '../context/auth_context';
import LinearProgress from '@mui/material/LinearProgress';
import Loading from '../style/Loading';
import { NavLink } from "react-router-dom";
import {FaUserDoctor, FaUserNurse} from "react-icons/fa6"
import {BiSolidKey} from "react-icons/bi"
import { FaHistory, FaFileMedicalAlt  } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: false,
      text: 'BMI Over Time',
    },
    tooltip: {
      callbacks: {
        afterLabel: ((tooltipItem, data) => {
          console.log(tooltipItem.dataIndex);
          const index = tooltipItem.dataIndex;
          const resultArray = [];
          resultArray.push(`Height: ${tooltipItem.dataset.heights[index]} cm`);
          resultArray.push(`Weight: ${tooltipItem.dataset.weights[index]} kg`);
          return resultArray
        }),
      }
    }
  },
};


const PatientDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const {currentUser} = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'BMI',
        data: [],
        borderColor: '#3d96ff',
        backgroundColor: '#3d96ff',
        heights: [],
        weights: [],
      },
    ],
  });

  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true)
      try {
        const response = await axios.get(`http://localhost:8567/api/patients/today/${currentUser.patientId}`);
        setAppointments(response.data);
        setLoading(false)
      } catch (error) {
        console.error('Error fetching appointments:', error);
        setLoading(false)
      }
    };

    fetchAppointments();
  }, [currentUser.patientId]);

  useEffect(() => {
    // Replace with your API URL
    axios.get(`http://localhost:8567/api/patients/bmi/${currentUser.patientId}`)
      .then(response => {
        const apiData = response.data;
        const labels = apiData.map(item => item.date);
        const data = apiData.map(item => item.bmi);
        const heights = apiData.map(item => item.height);
        const weights = apiData.map(item => item.weight);

        setChartData({
          labels: labels,
          datasets: [
            {
              ...chartData.datasets[0],
              data: data,
              heights: heights,
              weights: weights,
            },
          ],
        });
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  }, [currentUser.patientId]);

  return (
    <Wrapper>
      <div className="container">
        <Grid container spacing={4}>
          <Grid xs={8}>
          <div className="grid grid-two-column">

            <div className="services-2">
            <div className="services-colum-2">
                <NavLink to="/my-history">
                <div>
                    <FaHistory className="icon" />
                    <h3>Previous Appointments</h3>
                </div>
                </NavLink>
            </div>
            </div>

            <div className="services-2">
            <div className="services-colum-2">
                <NavLink to="/my-test">
                <div>
                    <FaFileMedicalAlt className="icon" />
                    <h3>Test Reports</h3>
                </div>
                </NavLink>
            </div>
            </div>

            <div className="services-2">
            <div className="services-colum-2">
                <NavLink to="/edit-profile">
                <div>
                <MdAccountCircle className="icon" />
                <h3>Edit Profile</h3>
                </div>
                </NavLink>
            </div>
            </div> 

            <div className="services-2">
            <div className="services-colum-2">
                <NavLink to="/change-password">
                <div>
                <BiSolidKey className="icon" />
                <h3>Change Password</h3>
                </div>
                </NavLink>
            </div>
            </div>             
          </div>
          <Card sx={{ minWidth: 275, minHeight: 100, borderRadius: 3, boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.5)', marginTop: 10 }}>
            <CardContent>
              <Typography sx={{ fontSize: 17 }} color="text.secondary" gutterBottom align='center'> 
                  My BMI records
                </Typography>
              <Line options={options} data={chartData} />
            </CardContent>
          </Card>
          

          </Grid>
          <Grid xs={4}>
            <Card sx={{ minWidth: 275, minHeight: 100, borderRadius: 3, boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.5)' }}>
              <CardContent>
                <Typography sx={{ fontSize: 17 }} color="text.secondary" gutterBottom>
                  Today's Appointments
                </Typography>
                {loading ? (
                  <Loading />
                ) : appointments.length > 0 ? (
                  appointments.map((appointment) => (
                    <AppointmentCard key={appointment.visitId} appointment={appointment} />
                  ))
                ) : (
                  <Typography sx={{ mt: 2 }}>No appointment today!</Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  padding: 90px 0;
  min-height: 80vh;
  .grid {
    gap: 48px;
  }

  .services-1,
  .services-2,
  .services-3 {
    width: auto;
    height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    background: ${({ theme }) => theme.colors.bg};
    text-align: center;
    border-radius: 20px;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;
  }

  .services-2 {
    gap: 40px;
    background-color: transparent;
    box-shadow: none;

    .services-colum-2 {
      background: ${({ theme }) => theme.colors.bg};
      display: flex;
      flex-direction: row;
      flex: 1;
      justify-content: center;
      align-items: center;
      border-radius: 20px;
      box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;
      transition: all 0.2s ease;

      div {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 10px;
        padding: 10px;
      }
    }

    .services-colum-2:hover {
        box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5);
        transform: scale(1.1);
    }
    
    .services-colum-2:active {
        box-shadow: none;
        transform: scale(0.9);
      }

  }

  h2 {
    text-align: center;
    text-transform: none;
    color: ${({ theme }) => theme.colors.text};
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 30px;
  }

  h3 {
    margin-top: 14px;
    font-size: 20px;
  }

  .icon {
    /* font-size: rem; */
    width: 80px;
    height: 80px;
    padding: 20px;
    border-radius: 30%;
    background-color: #fff;
    color: #3D96FF;
  }
`;

export default PatientDashboard