import { NavLink } from "react-router-dom";
import styled from "styled-components";
import Button from "./Button";
import { useModal } from "./Modal";

const Nav = styled.nav`
  margin: auto 0;
`;

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 4.8rem;
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    color: var(--color-grey-600);
    font-size: 2rem;
    font-weight: 600;
    padding: 1.2rem 2.4rem;
    transition: all 0.3s;
  }

  /* This works because react-router places the active class on the active NavLink */
  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-800);
    background-color: var(--color-grey-50);
    border-radius: var(--border-radius-lg);
    box-shadow: var(--shadow-lg);
  }
`;

const StyledNavButton = styled(Button)`
  width: 100%;
  color: var(--color-grey-600);
  padding: 1.2rem 2.4rem;
  box-shadow: none;
  justify-content: flex-start;

  &:hover,
  &:active {
    color: var(--color-grey-800);
    background-color: var(--color-grey-50);
    border-radius: var(--border-radius-lg);
    box-shadow: var(--shadow-lg);
  }
`;

function MainNav() {
  const { open } = useModal();
  return (
    <Nav>
      <NavList>
        <li>
          <StyledNavLink to="/dashboard">
            <span>Dashboard</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/analytics">
            <span>Analytics</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavButton onClick={() => open("quiz-create")}>
            <span>Create Quiz</span>
          </StyledNavButton>
        </li>
      </NavList>
    </Nav>
  );
}

export default MainNav;
