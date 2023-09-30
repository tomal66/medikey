import styled from "styled-components";
import {FiEdit2} from "react-icons/fi"
import {CgShoppingCart} from "react-icons/cg"
import {BsFillPersonFill, BsBuildingFillAdd, BsFillBuildingFill} from "react-icons/bs"
import { NavLink } from "react-router-dom";

const AdminDashboardItems = () => {
  return (
    <Wrapper>
        <div className="container">
        <h2>Dashboard</h2>
            <div className="grid grid-two-column">
            <div className="services-2">
                <div className="services-colum-2">
                    <NavLink to="/add-hospital">
                    <div>
                    <BsBuildingFillAdd className="icon" />
                    <h3>Add Hospital</h3>
                    </div>
                    </NavLink>
                </div>
                </div>


                <div className="services-2">
                <div className="services-colum-2">
                    <NavLink to="/all-hospitals">
                    <div>
                    <BsFillBuildingFill className="icon" />
                    <h3>All Hospitals</h3>
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
  padding: 9rem 0;

  .grid {
    gap: 4.8rem;
  }

  .services-1,
  .services-2,
  .services-3 {
    width: auto;
    height: 20rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    background: ${({ theme }) => theme.colors.bg};
    text-align: center;
    border-radius: 2rem;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;
  }

  .services-2 {
    gap: 4rem;
    background-color: transparent;
    box-shadow: none;

    .services-colum-2 {
      background: ${({ theme }) => theme.colors.bg};
      display: flex;
      flex-direction: row;
      flex: 1;
      justify-content: center;
      align-items: center;
      border-radius: 2rem;
      box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;
      transition: all 0.2s ease;

      div {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 1rem;
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
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 3rem;
  }

  h3 {
    margin-top: 1.4rem;
    font-size: 2rem;
  }

  .icon {
    /* font-size: rem; */
    width: 8rem;
    height: 8rem;
    padding: 2rem;
    border-radius: 30%;
    background-color: #fff;
    color: #3D96FF;
  }
`;

export default AdminDashboardItems