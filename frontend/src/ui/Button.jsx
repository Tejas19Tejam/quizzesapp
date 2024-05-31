import styled, { css } from "styled-components";

const sizes = {
  medium: css`
    font-size: 1.4rem;
    padding: 0.8rem 2.4rem;
    font-weight: 500;
    width: 100%;
  `,
  large: css`
    font-size: 2rem;
    font-weight: 600;
    padding: 0.8rem 6.4rem;
  `,
  "extra-large": css`
    font-size: 2.1rem;
    padding: 0.8rem 9.6rem;
    font-weight: 600;
    max-width: 28rem;
  `,
};

const variations = {
  primary: css`
    background-color: var(--color-green-700);
    color: var(--color-grey-0);
    &:hover {
      background-color: var(--color-green-800);
    }
  `,
  danger: css`
    color: var(--color-red-100);
    background-color: var(--color-red-700);

    &:hover {
      background-color: var(--color-red-800);
    }
  `,
};

const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  border: none;
  transition: all 0.3s;
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-lg);
  letter-spacing: 0.6px;
  background: none;
  width: 100%;
  white-space: nowrap;
  justify-content: center;

  ${(props) => sizes[props.size]}
  ${(props) => variations[props.variation]} & svg {
    width: 1.8rem;
    height: 1.8rem;
    color: var(--color-gray-100);
  }
`;

Button.defaultProps = {
  size: "large",
};

export default Button;
