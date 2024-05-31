import styled from "styled-components";

const StyledEmpty = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  border-radius: var(--border-radius-md);
  background-color: var(--color-gray-50);
`;

const MessageText = styled.p`
  font-size: 2rem;
  font-weight: 600;
  color: var(--color-gray-600);
  text-align: center;
`;

function Empty({ message }) {
  return (
    <StyledEmpty>
      <img src="img/empty.png" />
      <MessageText>{message}.</MessageText>
    </StyledEmpty>
  );
}

export default Empty;
