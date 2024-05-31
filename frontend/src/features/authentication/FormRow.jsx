import styled from "styled-components";

const StyledFormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 13rem 1fr;
  column-gap: 3.2rem;
`;

const Label = styled.label`
  font-size: 2rem;
  font-weight: 600;
  justify-self: end;
  white-space: nowrap;
`;

function FormRow({ label, children }) {
  return (
    <StyledFormRow>
      {label && <Label htmlFor={children.props.id}>{label}</Label>}
      {children}
    </StyledFormRow>
  );
}

export default FormRow;
