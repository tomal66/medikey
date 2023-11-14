import styled from "styled-components";
import {HiUserAdd} from "react-icons/hi"
import {FaUserDoctor, FaUserNurse} from "react-icons/fa6"
import {BiSolidKey} from "react-icons/bi"
import { NavLink } from "react-router-dom";



const DoctorDashboardItems = () => {
  return (
    <Wrapper>
        <div className="container">
        <h2>Dashboard</h2>
            <div className="grid grid-three-column">

                <div className="services-2">
                <div className="services-colum-2">
                    <NavLink to="/doctor-appointments">
                    <div>
                        <FaUserDoctor className="icon" />
                        <h3>Consult</h3>
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
        </div>
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

export default DoctorDashboardItems