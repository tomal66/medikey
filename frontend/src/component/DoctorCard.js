// DoctorCard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Loading from '../style/Loading';
import { Button } from '@mui/material';
import Rating from '@mui/material/Rating';
import { useNavigate } from 'react-router-dom/';
import { useAuthContext } from '../context/auth_context';
import Swal from 'sweetalert2';

const DoctorCard = ({ doctor, handleOpenModal }) => {
  const [hospital, setHospital] = useState({});
  const [profileImageUrl, setProfileImageUrl] = useState('');
  const [loadingImage, setLoadingImage] = useState(true);
  const {currentUser} = useAuthContext();
  const nav = useNavigate();
  const defaultProfileImg = 'images/doctor.jpg'

  const handleButtonClick = () => {
    if (currentUser) {
      handleOpenModal(doctor);
    } else {
      Swal.fire({
        title: 'Error',
        text: 'You need to login first',
        icon: 'error',
        confirmButtonColor: '#3D96FF',
        confirmButtonText: 'Login',
        heightAuto: true,
      }).then((result) => {
        if (result.isConfirmed) {
          nav('/login'); // Replace '/some-path' with the path you want to redirect to after successful update
        }
      });

    }
  };

  useEffect(() => {
    const fetchHospital = async () => {
      try {
        const response = await axios.get(`http://localhost:8567/api/hospitals/${doctor.hospitalId}`);
        setHospital(response.data);
      } catch (error) {
        console.error('Failed to fetch hospital details:', error);
      }
    };
  
    const fetchProfileImage = async () => {
      setLoadingImage(true);
      try {
        const imageUrl = doctor.profileImage
          ? `http://localhost:8567/api/storage/download/doctors/${doctor.userId}/${doctor.profileImage}`
          : defaultProfileImg;
  
        const response = await axios({
          method: 'GET',
          url: imageUrl,
          responseType: 'blob', // Important for getting the image data
        });
  
        // Create a local URL for the image
        const imageBlob = response.data;
        const imageObjectUrl = URL.createObjectURL(imageBlob);
        setProfileImageUrl(imageObjectUrl);
        setLoadingImage(false);
      } catch (error) {
        console.error('Failed to fetch profile image:', error);
        setProfileImageUrl(defaultProfileImg);
        setLoadingImage(false);
      }
    };
  
    fetchHospital();
    fetchProfileImage();
  }, [doctor]);

  return (
    <StyledDoctorCard>
      {loadingImage ? (
        <ImageLoading>
            <Loading /> 
        </ImageLoading>
        
      ) : (
        <>
            <ProfileImage
            src={profileImageUrl}
            alt={`Dr. ${doctor.firstName} ${doctor.lastName}`}
            onLoad={() => setLoadingImage(false)} // Set loading to false when the image finishes loading
            onError={() => setLoadingImage(false)} // Set loading to false if the image fails to load
            />
      </>
      )}

      <div className="doctor-info">
            <h4 className="doctor-name">{`Dr. ${doctor.firstName} ${doctor.lastName}`}</h4>
            {/* <Rating name="half-rating-read" value={3.5} precision={0.5} readOnly size='small' /> */}
            <p className="title">{doctor.title}</p>
            <p className="department"><Button>{doctor.department}</Button></p>
            <p className="hospital">{hospital.name}</p>
            <p className="hospital">{hospital.address}, {hospital.city}</p>
        </div>
        <Button
        variant='contained'
        sx={{ backgroundColor: '#3d96ff', '&:hover': { backgroundColor: '#2176ff' }, width: '100%', marginTop: '5px' }}
        onClick={handleButtonClick}>
            Check Availability
        </Button>
      
    </StyledDoctorCard>
  );
};

const StyledDoctorCard = styled.div`
  width: 300px;
  background-color: #fafafa;
  border-radius: 10px;
  border: 1px solid #ccc;
  padding: 15px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  display: flex;         // Set display to flex to use flexbox
  flex-direction: column; // Stack children vertically
  align-items: center;    // Center children horizontally within the container
  justify-content: center; // Center children vertically within the container
  gap: 10px;             // Add space between flex items
  text-align: center;

  .doctor-header {
    display: flex;
    justify-content: center; // Align items to the start
    align-items: center;
    margin-bottom: 10px;
  }

  .doctor-image {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
    margin-left: auto; // Push the image to the right
  }

  .doctor-name {
    font-weight: bold;
    font-size: 18px;
    color: #333;
    margin-top: 5px;
  }

  .body {
    font-size: 15px;
    color: #666;
    line-height: 1.6;
  }
`;

const ProfileImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid white; /* Adjust the border size as needed */
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); /* Adjust shadow size and color as needed */
  
`;


const ImageLoading = styled.div`
    width: 150px;
    height: 150px;
    border-radius: 50%;
    object-fit: cover;
    background-color: #eeeeee;
  `;
export default DoctorCard;
