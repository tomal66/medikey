import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
//import { useAuthContext } from './context/auth_context';
import { NavLink, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const AddDoctor = () => {
  //const { login, isAuthenticated, error, role } = useAuthContext();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('');
  const [message, setMessage] = useState('');
  const nav = useNavigate();

  const isAuthenticated = false;
  const role = null;
  const error = null;

  const doPasswordsMatch = () => {
    return password === confirmPassword;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username && password && password.length >= 8 && doPasswordsMatch()) {
        try{
            //await addProduct(productData, images);
            Swal.fire({
                title: 'Success',
                text: 'Doctor Added!',
                icon: 'success',
                confirmButtonColor: '#3D96FF',
                confirmButtonText: 'Done',
                heightAuto: true,
              }).then((result) => {
                if (result.isConfirmed) {
                  nav('/hospital-dashboard'); // Replace '/' with the desired path
                }
              });
          } catch(error){
            Swal.fire({
                title: 'Error',
                text: 'Failed to add hospital',
                icon: 'error',
                confirmButtonText: 'Try Again',
                heightAuto: true,
              });
          }
      
    } else {
      // Error alert message if any of the required fields are missing or invalid
      if (!username) setMessage("Please enter a username!");
      else if (!password) setMessage("Please enter a password!");
      else if (password.length < 8) setMessage("Password must be at least 8 characters long!");
      else if (!doPasswordsMatch()) setMessage("Passwords do not match!");
    }
    
  };

  useEffect(() => {
    if (isAuthenticated) {
      if(role==="ROLE_SELLER")
      {
        nav("/seller-dashboard");
      }
      else if(role==="ROLE_ADMIN"){
        nav("/admin-dashboard");
      }
      else{
        nav("/");
      }

    }
  }, [isAuthenticated, nav]);

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
        <Form onSubmit={handleSubmit}>
            

            <Input
              type="username"
              id="username"
              name="username"
              placeholder="Doctor Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            
            <StyledRow>
            <Input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            </StyledRow>
            <StyledRow>
            <Input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />

            <Input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
            </StyledRow>

            <Select
            id="department"
            name="department"
            value={department} // make sure to define this state variable
            onChange={(e) => setDepartment(e.target.value)} // make sure to define this function
            required
            >
                <option value="">Select a department</option>
                <option value="CARDIAC & VASCULAR SURGERY">CARDIAC & VASCULAR SURGERY</option>
                <option value="CARDIOLOGY (INTERVENTIONAL)">CARDIOLOGY (INTERVENTIONAL)</option>
                <option value="COLORECTAL & LAPAROSCOPIC SURGERY">COLORECTAL & LAPAROSCOPIC SURGERY</option>
                <option value="DERMATOLOGY">DERMATOLOGY</option>
                <option value="Diabetes">Diabetes</option>
                <option value="ENDOCRINOLOGY">ENDOCRINOLOGY</option>
                <option value="ENT, HEAD & NECK SURGERY">ENT, HEAD & NECK SURGERY</option>
                <option value="GASTROENTEROLOGY">GASTROENTEROLOGY</option>
                <option value="Hypertension">Hypertension</option>
                <option value="INTERNAL MEDICINE">INTERNAL MEDICINE</option>
                <option value="NEURO SURGERY">NEURO SURGERY</option>
                <option value="NEUROMEDICINE">NEUROMEDICINE</option>
                <option value="ORTHOPEDICS">ORTHOPEDICS</option>
                <option value="RESPIRATORY MEDICINE">RESPIRATORY MEDICINE</option>
                <option value="UROLOGY">UROLOGY</option>
            </Select>

            
            <Input
              type="tel"
              id="phone"
              name="phone"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            <Input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          <Button type="submit">Add Doctor</Button>
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

const Select = styled.select`
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
  max-width: 400px;
  padding: 40px;
  background-color: #fff;
  border-radius: 15px;
  margin-top: 100px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5);
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



const Button = styled.button`
  display: block;
  width: 100%;
  padding: 7.5px;
  font-size: 18px;
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.btn};
  border: none;
  border-radius: 3px;
  cursor: pointer;
  transition: all 0.3s ease;
  -webkit-transition: all 0.3s ease 0s;
  -moz-transition: all 0.3s ease 0s;
  -o-transition: all 0.3s ease 0s;

  &:hover,
  &:active {
    box-shadow: 0 20px 20px 0 rgb(132 144 255 / 30%);
    box-shadow: ${({ theme }) => theme.colors.shadowSupport};
    transform: scale(0.96);
  }

`;

const Options = styled.div`
margin-top: 30px;
  display: flex;
  justify-content: space-between;
  
`;

const Option = styled.a`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.helper};
  text-decoration: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export default AddDoctor;
