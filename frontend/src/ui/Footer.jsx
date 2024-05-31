import styled from "styled-components";
import { useLogout } from "../features/authentication/useLogout";

const StyledFooter = styled.footer`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  border-top: 1px solid var(--color-grey-700);
  padding-top: 2.4rem;
`;

const Button = styled.button`
  font-size: 2rem;
  font-weight: 700;
  text-transform: uppercase;
  justify-self: center;
  background: none;
  letter-spacing: 0.6px;
  border: none;
`;

function Footer() {
  const { logout, isPending } = useLogout();
  return (
    <StyledFooter>
      <Button onClick={logout} disabled={isPending}>
        Logout
      </Button>
    </StyledFooter>
  );
}

export default Footer;
