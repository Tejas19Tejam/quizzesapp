import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Heading = styled.p`
  font-family: "Jomhuria", serif;
  font-size: 7.4rem;
  font-weight: 400;
  letter-spacing: 0.5px;
  text-transform: uppercase;
`;

function Logo() {
  return (
    <NavLink to="/">
      <Heading>Quizzie</Heading>
    </NavLink>
  );
}

export default Logo;
