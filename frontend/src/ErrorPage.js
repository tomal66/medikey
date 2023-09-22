import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Button } from "./style/Button";

const ErrorPage = () => {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);
  return (
    <Wrapper>
      <div className="container">
        <div>
          <h2>404</h2> 
          <h3>Page Not Found</h3>
          <p>
            Sorry, The page you have requested does not exist!
          </p>

          <Button onClick={goBack}>Go Back</Button>
        </div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  .container {
    padding: 9rem ;
    text-align: center;
    margin-bottom: 15rem;

    h2 {
      font-size: 10rem;
    }

    h3 {
      font-size: 4.2rem;
    }

    p {
      margin: 2rem 0;
    }
  }
`;

export default ErrorPage