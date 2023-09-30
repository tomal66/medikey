import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../style/Button";

const HeroSection = ({ myData }) => {
    const { name } = myData;
  return (
    <Wrapper>
      <div className="container"> 
        <div className="grid grid-two-column">
          <div className="hero-section-data">
            <p className="intro-data">Welcome to </p>
            <h1> {name} </h1>
            <p>
              Connecting patients and healthcare simultaneously
            </p>
            <NavLink to="/register">
              <Button>Join Now</Button>
            </NavLink>
          </div>
          {/* our homepage image  */}
          <div className="hero-section-image">
            <figure>
              <img
                src="images/hero.jpg"
                alt="hero-section-photo"
                className="img-style"
              />
            </figure>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  padding: 12rem 0;
  background-color: #E6F8FB;

  img {
    min-width: 10rem;
    height: 10rem;
  }

  .hero-section-data {
    p {
      margin: 2rem 0;
    }

    h1 {
      text-transform: capitalize;
      font-weight: bold;
    }

    .intro-data {
      margin-bottom: 0;
      color: #3D96FF;
    }
  }

  .hero-section-image {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;

  }
  figure {
    position: relative;
    z-index: 0;

    &::after {
      content: "";
      width: 80%;
      height: 80%;
      background-color: #91c4ff;
      position: absolute;
      left: 25%;
      top: -3rem;
      z-index: -1;
      border-radius: 20px;
    }
  }
  .img-style {
    width: 100%;
    height: auto;
    border-radius: 20px;
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    .grid {
      gap: 10rem;
    }

    figure::after {
      content: "";
      width: 50%;
      height: 100%;
      left: 0;
      top: 10%;
      /* bottom: 10%; */
      background-color: rgba(81, 56, 238, 0.4);
    }
  }
`;

export default HeroSection