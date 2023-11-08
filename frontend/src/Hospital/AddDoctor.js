import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { NavLink, useNavigate } from 'react-router-dom';
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

const AddDoctor = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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
  // Additional state for the image file
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null); // For the image preview
  const [loading, setLoading] = useState(false);


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
  const {currentUser} = useAuthContext();
  const API = 'http://localhost:8567/api/'

  const departments = [
    {
      value: 'CARDIAC & VASCULAR SURGERY',
      label: 'Cardiac & Vascular Surgery',
    },
    {
      value: 'CARDIOLOGY (INTERVENTIONAL)',
      label: 'Cardiology (Interventional)',
    },
    {
      value: 'COLORECTAL & LAPAROSCOPIC SURGERY',
      label: 'Colorectal & Laparoscopic Surgery',
    },
    {
      value: 'DERMATOLOGY',
      label: 'Dermatology',
    },
    {
      value: 'DIABETES',
      label: 'Diabetes',
    },
    {
      value: 'ENDOCRINOLOGY',
      label: 'Endocrinology',
    },
    {
      value: 'ENT, HEAD & NECK SURGERY',
      label: 'ENT, Head & Neck Surgery',
    },
    {
      value: 'GASTROENTEROLOGY',
      label: 'Gastroenterology',
    },
    {
      value: 'HYPERTENSION',
      label: 'Hypertension',
    },
    {
      value: 'INTERNAL MEDICINE',
      label: 'Internal Medicine',
    },
    {
      value: 'NEURO SURGERY',
      label: 'Neuro Surgery',
    },
    {
      value: 'NEUROMEDICINE',
      label: 'Neuromedicine',
    },
    {
      value: 'ORTHOPEDICS',
      label: 'Orthopedics',
    },
    {
      value: 'RESPIRATORY MEDICINE',
      label: 'Respiratory Medicine',
    },
    {
      value: 'UROLOGY',
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

  const doPasswordsMatch = () => {
    return password === confirmPassword;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (username && password && password.length >= 8 && doPasswordsMatch()) {
      try {
        // Register the user
        const userResponse = await axios.post(API + 'auth/register', {
          username: username,
          password: password,
          role: 'ROLE_DOCTOR',
        });
  
        const userId = userResponse.data;
  
        // Prepare the DoctorDto object with all necessary fields
        const doctorDto = {
          userId: userId, // Assuming the backend expects the userId separately
          firstName: firstName,
          lastName: lastName,
          email: email,
          phone: phone,
          department: department,
          title: title, // Include title
          maxPatients: parseInt(maxPatients), // Convert maxPatients to a number
          daysOfWeek: selectedDays.join(','), // Convert array of days to a comma-separated string
          startTime: startTime.format('HH:mm:ss'), // Format startTime to a string
          hospitalId: currentUser.hospitalId,
        };
  
        // Register the doctor with the received userId and other details
        await axios.post(API + 'doctors', doctorDto);

        // Check if a profile image was selected
        if (image) {
          const imageFormData = new FormData();
          imageFormData.append('file', image);

          // Upload the profile image
          await axios.post(`${API}storage/upload/doctors/${userId}`, imageFormData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
        }
  
        // Prepare the email data
        const emailData = {
          to: email,
          from: "medikey.health@gmail.com",
          subject: "Account Created",
          name: `${firstName} ${lastName}`, // Consider including the last name as well
          role: 'Doctor',
          username: username,
          password: password,
        };
  
        // Send the email
        await axios.post(API + 'mail/sendingEmail', emailData);
        
        // Success alert
        setLoading(false);
        Swal.fire({
          title: 'Success',
          text: 'Doctor Added and Email Sent!',
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
        setLoading(false);
        // Handle errors from the API request
        console.error('There was an error registering the doctor:', error);
        // Error alert for the email sending failure
        const errorMessage = error.response && error.response.data ? error.response.data : 'Failed to add doctor';
        Swal.fire({
          title: 'Error',
          text: errorMessage,
          icon: 'error',
          confirmButtonText: 'Try Again',
          confirmButtonColor: '#3D96FF',
          heightAuto: true,
        });
      }
    } else {
      setLoading(false);
      // Error alert message if any of the required fields are missing or invalid
      let message = "Please check the form!";
      if (!username) message = "Please enter a username!";
      else if (!password) message = "Please enter a password!";
      else if (password.length < 8) message = "Password must be at least 8 characters long!";
      else if (!doPasswordsMatch()) message = "Passwords do not match!";
      setMessage(message);
      Swal.fire({
        title: 'Error',
        text: message,
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#3D96FF',
        heightAuto: true,
      });
    }
  };
  

// const handleSubmit = async (e) => {
//   e.preventDefault();
//   console.log(selectedDays)
//   // Format the Day.js object to a time string (e.g., "15:30:00")
//   const formattedTime = startTime.format('HH:mm:ss');
//   console.log(formattedTime);

// };



  useEffect(() => {
    if(error){
      setMessage("Invalid Credentials")
    }
  }, [error, setMessage])

  useEffect(() => {
    setMessage('');
  }, []);

  return (
    <Wrapper>
      <Container>
        <Title>Register Doctor</Title>
        {
          message && (
            <Alert>
              {message}
            </Alert>
          )
        }

        <ImageUploadContainer>
          <ImagePreview src={preview || 'images/doctor.jpg'} alt="Doctor's Profile" />
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
          <FormControl sx={{ m: 1, width: 350 }}>
            <TextField
              autoComplete="username"
              name="username"
              variant="outlined"
              required
              id="username"
              label="Doctor Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              inputProps={{ style: { textTransform: 'none' } }}
            />
          </FormControl>

          <StyledRow>
            <FormControl sx={{ m: 1, width: 350 }}>
              <TextField
                type="password"
                name="password"
                variant="outlined"
                required
                id="password"
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                inputProps={{ style: { textTransform: 'none' } }}
                
              />
            </FormControl>
            <FormControl sx={{ m: 1, width: 350 }}>
              <TextField
                type="password"
                name="confirmPassword"
                variant="outlined"
                required
                id="confirmPassword"
                label="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                inputProps={{ style: { textTransform: 'none' } }}
              />
            </FormControl>
          </StyledRow>

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
            Add Doctor
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

export default AddDoctor;
