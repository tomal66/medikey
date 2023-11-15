import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Button } from "./style/Button";

const Unauthorized = () => {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);
  return (
    <Wrapper>
      <div className="container">
        <div>
          <h2>403</h2> 
          <h3>Access Denied</h3>
          <p>
            Sorry, you don't have access to this page!
          </p>

          <Button onClick={goBack}>Go Back</Button>
        </div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  .container {
    padding: 90px ;
    text-align: center;
    margin-bottom: 150px;
    min-height: 55vh;

    h2 {
      font-size: 100px;
    }

    h3 {
      font-size: 42px;
    }

    p {
      margin: 20px 0;
    }
  }
`;

export default Unauthorized