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
  
  .iSIFGq {
    margin: 0;
  }

  .contact-short {
    max-width: 60vw;
    margin: auto;
    padding: 50px 100px;
    background-color: ${({ theme }) => theme.colors.bg};
    border-radius: 10px;
    box-shadow: ${({ theme }) => theme.colors.shadowSupport};
    transform: translateY(50%);

    .grid div:last-child {
      justify-self: end;
      align-self: center;
    }
  }

  footer {
    padding: 40px 0 90px 0;
    background-color: ${({ theme }) => theme.colors.footer_bg};
    h3 {
      color: ${({ theme }) => theme.colors.hr};
      margin-bottom: 24px;
    }
    p {
      color: ${({ theme }) => theme.colors.white};
    }
    .footer-social--icons {
      display: flex;
      gap: 20px;

      div {
        padding: 10px;
        border-radius: 50%;
        border: 2px solid ${({ theme }) => theme.colors.white};

        .icons {
          color: ${({ theme }) => theme.colors.white};
          font-size: 24px;
          position: relative;
          cursor: pointer;
        }
      }
    }
  }

  .footer-bottom--section {
    padding-top: 0px;
    hr {
      margin-bottom: 20px;
      color: ${({ theme }) => theme.colors.hr};
      height: 0.1px;
    }
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    .contact-short {
      max-width: 80vw;
      margin: 48px auto;
      transform: translateY(0%);
      text-align: center;

      .grid div:last-child {
        justify-self: center;
      }
    }

    footer {
      padding: 90px 0 90px 0;
    }

    .footer-bottom--section {
      padding-top: 48px;
    }
  }
`;

export default Footer