import styled from "styled-components";

const ButtonCloseIcon = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;

  &:hover {
    background-color: var(--color-gray-100);
  }
`;

export default ButtonCloseIcon;
