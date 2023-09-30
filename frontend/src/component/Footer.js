import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
//import { Button } from "../styles/Button";
import { FaDiscord, FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <Wrapper>
        {/* footer section */}

        <footer>
          <div className="footer-bottom--section">
            <div className="container grid grid-four-column ">
              <div>
              <p>
                ©{new Date().getFullYear()} MediKey
              </p>
              <p>
                All Rights Reserved
              </p>
              </div>
              
              <div className="footer-social">
              <h3>Follow Us</h3>
              <div className="footer-social--icons">
                <div>
                  <FaLinkedin className="icons" />
                </div>
                <div>
                  <FaInstagram className="icons" />
                </div>
                <div>
                    <FaFacebook className="icons" />
                </div>
              </div>
              </div>
              <div className="footer-contact">
              <h3>24/7 Support</h3>
              <h3>+88 01234567890</h3>
              </div>
              <div>
                <NavLink to="/policy">
                  <p>Privacy Policy</p>
                </NavLink>
                
                <NavLink to="/about">
                  <p>About Us</p>
                </NavLink>

                <NavLink to="/about">
                  <p>Terms and Conditions</p>
                </NavLink>

              </div>
            </div>
          </div>
        </footer>
      </Wrapper>
    </>
  )
}

const Wrapper = styled.section`
  position: relative;
  z-index: 1301;  // ensure this is higher than drawer's z-index
  
  .iSIFGq {
    margin: 0;
  }

  .contact-short {
    max-width: 60vw;
    margin: auto;
    padding: 5rem 10rem;
    background-color: ${({ theme }) => theme.colors.bg};
    border-radius: 1rem;
    box-shadow: ${({ theme }) => theme.colors.shadowSupport};
    transform: translateY(50%);

    .grid div:last-child {
      justify-self: end;
      align-self: center;
    }
  }

  footer {
    padding: 4rem 0 9rem 0;
    background-color: ${({ theme }) => theme.colors.footer_bg};
    h3 {
      color: ${({ theme }) => theme.colors.hr};
      margin-bottom: 2.4rem;
    }
    p {
      color: ${({ theme }) => theme.colors.white};
    }
    .footer-social--icons {
      display: flex;
      gap: 2rem;

      div {
        padding: 1rem;
        border-radius: 50%;
        border: 2px solid ${({ theme }) => theme.colors.white};

        .icons {
          color: ${({ theme }) => theme.colors.white};
          font-size: 2.4rem;
          position: relative;
          cursor: pointer;
        }
      }
    }
  }

  .footer-bottom--section {
    padding-top: 0rem;
    hr {
      margin-bottom: 2rem;
      color: ${({ theme }) => theme.colors.hr};
      height: 0.1px;
    }
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    .contact-short {
      max-width: 80vw;
      margin: 4.8rem auto;
      transform: translateY(0%);
      text-align: center;

      .grid div:last-child {
        justify-self: center;
      }
    }

    footer {
      padding: 9rem 0 9rem 0;
    }

    .footer-bottom--section {
      padding-top: 4.8rem;
    }
  }
`;

export default Footer