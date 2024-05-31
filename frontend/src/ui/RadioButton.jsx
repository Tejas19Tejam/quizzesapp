import styled, { css } from "styled-components";

const StyledRadio = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 1.6rem;
`;
const CustomRadio = styled.input.attrs({ type: "radio" })`
  outline: 2px solid var(--color-grey-400);
  border-radius: 100%;
  cursor: pointer;
  appearance: none;
  padding: 0.8rem;

  &:checked {
    outline-offset: 3px;
    background-color: ${({ filled }) =>
      filled ? css`var(--color-green-700)` : css`var(--color-grey-700)`};
  }
`;

const Label = styled.div`
  display: flex;
  column-gap: 1.8rem;
`;

function RadioButton({ children, name, filled = false, onChange, checked }) {
  return (
    <StyledRadio>
      <CustomRadio
        onChange={onChange}
        type="radio"
        name={name}
        defaultChecked
        filled={filled}
        checked={checked}
      />
      <Label>{children}</Label>
    </StyledRadio>
  );
}

export default RadioButton;
