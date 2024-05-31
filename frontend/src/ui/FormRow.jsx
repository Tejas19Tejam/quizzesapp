import styled from "styled-components";

const StyledFormRow = styled.div`
  display: flex;
  align-items: center;
  /* grid-template-columns: 1fr auto; */
  gap: 2.4rem;
  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.8rem;
  }
`;

const Label = styled.label`
  font-size: 2.4rem;
  font-weight: 600;
  color: var(--color-grey-400);
  white-space: nowrap;
  margin-right: 2rem;
`;

const Error = styled.p`
  font-size: 1.4rem;
  font-weight: 500;
  color: var(--color-red-700);
  /* margin-bottom: 1.2rem; */
  /* opacity: ${({ error }) => (error ? 1 : 0)}; */
`;

function FormRow({ label, error, children }) {
  return (
    <>
      <StyledFormRow>
        {label && <Label htmlFor={children.props.id}>{label}</Label>}
        {children}
      </StyledFormRow>
      {error && <Error>{error}</Error>}
    </>
  );
}

export default FormRow;
