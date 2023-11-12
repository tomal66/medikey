import styled from "styled-components";
import {BsFillCalendarCheckFill, BsFillPersonCheckFill} from "react-icons/bs"
import {BiEditAlt} from "react-icons/bi"
import {TbReportMedical} from "react-icons/tb"
import { NavLink, useNavigate } from "react-router-dom";
import { Modal, Button } from '@mui/material';
import Html5QrcodePlugin from '../Html5QrcodePlugin';
import Loading from '../style/Loading'
import { useState } from "react";
import axios from "axios";
import format from "date-fns/format";
import Swal from "sweetalert2";

const MPDashboardItems = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [error, setError] = useState(false);
    const [message, setMessage] = useState('');
    const[visitData, setVisitData] = useState();
    const nav = useNavigate();
    const [currentAction, setCurrentAction] = useState(null); 

    const handleClick = (action) => {
        setCurrentAction(action); // Set the current action
        setModalOpen(true);
    };

      const closeModal = () => {
        setModalOpen(false);
        setShowAlert(false);
        setMessage(false);  // Reset the alert when closing the modal
      };
    
      const onNewScanResult = async (decodedText, decodedResult) => {
        setIsLoading(true);  // Begin loading state
      
        try {
          const response = await axios.get(`http://localhost:8567/api/visits/code/${decodedText}`);
          const data = response.data;
      
          // Check if the data contains an 'id' or 'visitId'
          if (data && data.visitId) {
            const visitDate = new Date(data.visitDate);
            const today = new Date();
      
            // Compare only the year, month, and day parts
            if (format(visitDate, 'yyyy-MM-dd') === format(today, 'yyyy-MM-dd')) {
                if (currentAction === 'acceptPatient') {
                    // Check if arrivalTime already exists
                    if (data.arrivalTime) {
                        setShowAlert(true);
                        setMessage('Already Queued!');
                        //closeModal();
                    } else {
                        const visitDto = {
                            ...data, // Spread the existing data
                            arrivalTime: new Date().toISOString() // Update the arrival time
                        };
            
                        // Send a PUT request to update the visit
                        await axios.put(`http://localhost:8567/api/visits/${data.visitId}`, visitDto);
                        closeModal();
                        Swal.fire({
                            title: 'Success',
                            text: 'Patient queued!',
                            icon: 'success',
                            confirmButtonColor: '#3D96FF',
                            confirmButtonText: 'Done',
                            heightAuto: true,
                            disableScrollLock: true
                        }).then((result) => {
                            // Additional actions after the confirmation, if needed
                        });
                    }
                } else if (currentAction === 'takeHistory') {
                    // Logic for taking history
                    closeModal();
                    nav(`/take-history/${data.visitId}/${decodedText}`);
                }
              
            } else {
              setShowAlert(true);
              setMessage('Appointment is not scheduled for today');
            }
          } else {
            setShowAlert(true);
            setMessage('No appointment found!');
          }
        } catch (error) {
          setShowAlert(true);
          setMessage('No appointment found!');
        } finally {
          setIsLoading(false);
        }
      };
      
      
    


  return (
    <Wrapper>
        <div className="container">
        <h2>Dashboard</h2>
            <div className="grid grid-three-column">
                <div className="services-2" onClick={() => handleClick('acceptPatient')}>
                <div className="services-colum-2">
                    <NavLink>
                        <div >
                        <BsFillPersonCheckFill className="icon" />
                        <h3>Accept Patient</h3>
                        </div>
                    </NavLink>
                </div>
                </div>

                <div className="services-2" onClick={() => handleClick('takeHistory')}>
                <div className="services-colum-2">
                    <NavLink>
                    <div>
                    <BiEditAlt className="icon" />
                    <h3>Take History</h3>
                    </div>
                    </NavLink>
                </div>
                </div>

                <div className="services-2">
                <div className="services-colum-2">
                    <NavLink to="/appointments">
                    <div>
                    <BsFillCalendarCheckFill className="icon" />
                    <h3>Appointments</h3>
                    </div>
                    </NavLink>
                </div>
                </div>

                <div className="services-2">
                <div className="services-colum-2">
                    <NavLink to="/add-test">
                    <div>
                    <TbReportMedical className="icon" />
                    <h3>Upload Report</h3>
                    </div>
                    </NavLink>
                </div>
                </div>

                
               
            </div>
        </div>
        
        <Modal
            disableScrollLock
            open={isModalOpen}
            onClose={closeModal}
        >
            <ModalContainer>
            <h3>Appointment Authentication</h3>
            <div>
                {isLoading ? (
                <Loading />
                ) : showAlert ? (
                <>
                    <Alert>{message}</Alert>
                    <Button variant="contained" color="primary" onClick={closeModal}>Close</Button>
                </>
                ) : (
                <Html5QrcodePlugin
                    fps={10}
                    qrbox={250}
                    disableFlip={false}
                    qrCodeSuccessCallback={onNewScanResult}
                />
                )}
            </div>
            </ModalContainer>
        </Modal>


    </Wrapper>
  )
}

const Wrapper = styled.section`
  padding: 90px 0;

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

const ModalContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  outline: none;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  text-align: center;
  max-width: 500px;
  
  h3 {
    margin: 5px;
  }
`;

const Alert = styled.div`
    width: 100%;
    padding: 10px;
    background-color: #f8d7da;
    color: #721c24;
    text-align: center;
    border: 1px solid #f5c6cb;
    border-radius: 3px;
    margin-bottom: 10px;
    font-size: 15px;
`;

export default MPDashboardItems