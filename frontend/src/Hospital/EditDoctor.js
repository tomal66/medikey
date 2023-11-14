import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { TextField, Button, FormControl, MenuItem } from '@mui/material';
import { useAuthContext } from '../context/auth_context';
import axios from 'axios';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import Loading from '../style/Loading';

const EditDoctor = () => {
  const [doctorData, setDoctorData] = useState(null);
  const {id} = useParams();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('');
  const [message, setMessage] = useState('');
  const [selectedDays, setSelectedDays] = useState([]); // State for selected days
  const [startTime, setStartTime] = React.useState(dayjs()); // Initializes with the current time
  const [title, setTitle] = useState('');
  const [maxPatients, setMaxPatients] = useState('');
  const [minutes, setMinutes] = useState('');
  // Additional state for the image file
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null); // For the image preview
  const [loading, setLoading] = useState(false);
  const [loadingImage, setLoadingImage] = useState(false);
  const defaultProfileImg = 'images/doctor.jpg';


  const fetchProfileImage = async (doctor) => {
    setLoadingImage(true);
    try {
      // Check if profileImage is not null and not an empty string
      if (doctor.profileImage && doctor.profileImage !== "") {
        const imageUrl = `http://localhost:8567/api/storage/download/doctors/${doctor.userId}/${doctor.profileImage}`;
  
        const response = await axios({
          method: 'GET',
          url: imageUrl,
          responseType: 'blob', // Important for getting the image data
        });
  
        // Create a local URL for the image
        const imageBlob = response.data;
        const imageObjectUrl = URL.createObjectURL(imageBlob);
        setPreview(imageObjectUrl);
      } else {
        // Set default image if profileImage is null or empty
        setPreview(defaultProfileImg);
      }
    } catch (error) {
      console.error('Failed to fetch profile image:', error);
      setPreview(defaultProfileImg);
    } finally {
      setLoadingImage(false);
    }
  };
  


  // Handle image selection
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };


  const handleDaysChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedDays(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const convertDaysStringToArray = (daysString) => {
    if (daysString) {
      const daysArray = daysString.split(',').map(day => day.trim());
      console.log(daysArray)
      setSelectedDays(daysArray);
    } else {
      setSelectedDays([]); // Ensure it's always an array
    }
  };

  const convertTimeStringToDayjs = (timeString) => {
    // Assuming timeString is in 'HH:mm:ss' format
    return dayjs(`1970-01-01 ${timeString}`);
  };
  

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 350,
      },
    },
  };


  const nav = useNavigate();
  const API = 'http://localhost:8567/api/'
  const {currentUser} = useAuthContext();

  useEffect(() => {
    const fetchDoctorData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API}doctors/id/${id}`);
        const data = response.data;

        setDoctorData(data);
        setFirstName(data.firstName);
        setLastName(data.lastName);
        setTitle(data.title);
        setDepartment(data.department);
        setMaxPatients(data.maxPatients);
        setMinutes(data.minutes);
        convertDaysStringToArray(data.daysOfWeek);
        setStartTime(convertTimeStringToDayjs(data.startTime));
        setPhone(data.phone);
        setEmail(data.email);
        if (data.profileImage && data.profileImage !== "") {
            fetchProfileImage(data);
          }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching doctor data:', error);
        setLoading(false);
      }
    };

    fetchDoctorData();
  }, [id]);

  const departments = [
    {
      value: 'Cardiac & Vascular Surgery',
      label: 'Cardiac & Vascular Surgery',
    },
    {
      value: 'Cardiology (Interventional)',
      label: 'Cardiology (Interventional)',
    },
    {
      value: 'Colorectal & Laparoscopic Surgery',
      label: 'Colorectal & Laparoscopic Surgery',
    },
    {
      value: 'Dermatology',
      label: 'Dermatology',
    },
    {
      value: 'Diabetes',
      label: 'Diabetes',
    },
    {
      value: 'Endocrinology',
      label: 'Endocrinology',
    },
    {
      value: 'ENT, Head & Neck Surgery',
      label: 'ENT, Head & Neck Surgery',
    },
    {
      value: 'Gastroenterology',
      label: 'Gastroenterology',
    },
    {
      value: 'Hypertension',
      label: 'Hypertension',
    },
    {
      value: 'Internal Medicine',
      label: 'Internal Medicine',
    },
    {
      value: 'Neuro Surgery',
      label: 'Neuro Surgery',
    },
    {
      value: 'Neuromedicine',
      label: 'Neuromedicine',
    },
    {
      value: 'Orthopedics',
      label: 'Orthopedics',
    },
    {
      value: 'Respiratory Medicine',
      label: 'Respiratory Medicine',
    },
    {
      value: 'Urology',
      label: 'Urology',
    },
  ];

  const daysOfWeek = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
  ];
  
  const error = null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    // Create updatedData object
    const updatedData = {
      ...doctorData,
      firstName,
      lastName,
      title,
      department,
      maxPatients: parseInt(maxPatients), // Convert maxPatients to a number
      minutes: parseInt(minutes),
      daysOfWeek: selectedDays.join(','),
      startTime: startTime.format('HH:mm:ss'),
      phone,
      email,
    };
  
    try {
      // Update doctor data
      await axios.put(`${API}doctors/${doctorData.doctorId}`, updatedData);
  
      // Check if there's a new image and if the old image exists
      if (image) {
        if(doctorData.profileImage && doctorData.profileImage !== ""){
            // Delete the old image
            await axios.delete(`${API}storage/delete/doctors/${doctorData.userId}/${doctorData.profileImage}`);
        }
        
  
        // Prepare and upload the new image
        const imageFormData = new FormData();
        imageFormData.append('file', image);
        await axios.post(`${API}storage/upload/doctors/${doctorData.userId}`, imageFormData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      }
  
      Swal.fire({
        title: 'Success',
        text: 'Doctor Updated!',
        icon: 'success',
        confirmButtonColor: '#3D96FF',
        confirmButtonText: 'Done',
        heightAuto: true,
      }).then((result) => {
        if (result.isConfirmed) {
          nav('/hospital-dashboard'); // Navigate to the dashboard
        }
      });
    } catch (error) {
      console.error('Error updating doctor:', error);
      Swal.fire('Error', 'Failed to update doctor', 'error');
    } finally {
      setLoading(false);
    }
  };
  
  




  useEffect(() => {
    if(error){
      setMessage("API Error!")
    }
  }, [error, setMessage])

  useEffect(() => {
    setMessage('');
  }, []);

  return (
    <Wrapper>
      <Container>
        <Title>Edit Doctor</Title>
        {
          message && (
            <Alert>
              {message}
            </Alert>
          )
        }

        <ImageUploadContainer>
            {loadingImage ? (
                <ImageLoading>
                    <Loading /> 
                </ImageLoading>
                
            ) : (
                <>
                    <ImagePreview 
                        src={preview || 'images/doctor.jpg'} 
                        alt="Doctor's Profile"
                        onLoad={() => setLoadingImage(false)}
                        onError={() => setLoadingImage(false)} />
            </>
            )}
          
          <FormControl sx={{ m: 1 }}>
            <Input
              accept="image/*"
              id="profile-image"
              type="file"
              onChange={handleImageChange}
            />
          </FormControl>
        </ImageUploadContainer>

        <Form onSubmit={handleSubmit}>
          

          <StyledRow>
            <FormControl sx={{ m: 1, width: 350 }}>
              <TextField
                type="text"
                name="firstName"
                variant="outlined"
                required
                id="firstName"
                label="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                inputProps={{ style: { textTransform: 'none' } }}
              />
            </FormControl>
            <FormControl sx={{ m: 1, width: 350 }}>
              <TextField
                type="text"
                name="lastName"
                variant="outlined"
                required
                id="lastName"
                label="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                inputProps={{ style: { textTransform: 'none' } }}
              />
            </FormControl>
          </StyledRow>
          <FormControl sx={{ m: 1, width: 350 }}>
            <TextField
              name="title"
              variant="outlined"
              required
              id="title"
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              inputProps={{ style: { textTransform: 'none' } }}
            />
          </FormControl>


          <FormControl sx={{ m: 1, width: 350 }}>
            <TextField
              select
              label="Department"
              id="department"
              name="department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              required
              inputProps={{MenuProps: {disableScrollLock: true}}}
            >
              {departments.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </FormControl>

          <StyledRow>          
          <FormControl sx={{ m: 1, width: 350 }}>
            <TextField
              type="number"
              name="maxPatients"
              variant="outlined"
              required
              id="maxPatients"
              label="Max Patients"
              value={maxPatients}
              onChange={(e) => setMaxPatients(e.target.value)}
              inputProps={{ style: { textTransform: 'none' } }}
            />
          </FormControl>
          <FormControl sx={{ m: 1, width: 350 }}>
            <TextField
              type="number"
              name="minutes"
              variant="outlined"
              required
              id="minutes"
              label="Minutes"
              value={minutes}
              onChange={(e) => setMinutes(e.target.value)}
              inputProps={{ style: { textTransform: 'none' } }}
            />
          </FormControl>
          </StyledRow>

          <StyledRow>

          
            <FormControl sx={{ m: 1, width: 350 }}>
              <InputLabel>Days of the Week</InputLabel>
              <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                value={selectedDays}
                onChange={handleDaysChange}
                input={<OutlinedInput label="Days of the Week" />}
                renderValue={(selected) => selected.join(', ')}
                MenuProps={MenuProps}
                inputProps={{MenuProps: {disableScrollLock: true}}}
              >
                {daysOfWeek.map((name) => (
                  <MenuItem key={name} value={name}>
                    <Checkbox checked={selectedDays.indexOf(name) > -1} />
                    <ListItemText primary={name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, width: 350 }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                  label="Starting Time"
                  value={startTime}
                  onChange={(newTime) => setStartTime(newTime)}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </FormControl>
            </StyledRow>


          

          <FormControl sx={{ m: 1, width: 350 }}>
            <TextField
              type="tel"
              name="phone"
              variant="outlined"
              required
              id="phone"
              label="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              inputProps={{ style: { textTransform: 'none' } }}
            />
          </FormControl>

          <FormControl sx={{ m: 1, width: 350 }}>
            <TextField
              type="email"
              name="email"
              variant="outlined"
              required
              id="email"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              inputProps={{ style: { textTransform: 'none' } }}
            />
          </FormControl>

          <LoadingButton
            type="submit"
            variant="contained"
            size="large"
            loading={loading}
            sx={{ backgroundColor: '#3d96ff', '&:hover': { backgroundColor: '#2176ff' }, width: '350px' }}
          >
            Update
          </LoadingButton>

        </Form>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.bg};
`;

const Input = styled.input`
  display: block;
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 3px;
  margin-bottom: 10px;
  outline: none;
  text-transform: none;
  &:focus {
    border-color: ${({ theme }) => theme.colors.helper};
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

const Container = styled.div`
  width: 100%;
  max-width: 450px;
  padding: 40px;
  background-color: #fff;
  border-radius: 15px;
  margin-top: 50px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5);
  margin-bottom: 50px;
`;

const Title = styled.h1`
  font-size: 24px;
  color: #474747;
  text-align: center;
  margin-bottom: 30px;
`;

const Form = styled.form`
  width: 100%;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  ${Input} {
    width: calc(50% - 5px);  // Adjust width of individual Input components
  }
`;

const ImageUploadContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const ImagePreview = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%; // Makes the image circular
  object-fit: cover;
  margin-right: 15px;
`;

const ImageLoading = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%; // Makes the image circular
  object-fit: cover;
  margin-right: 15px;
  `;

export default EditDoctor;
