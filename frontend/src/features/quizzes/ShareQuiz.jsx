import styled from "styled-components";
import Heading from "../../ui/Heading";
import Button from "../../ui/Button";

import { copyToClipboard } from "../../utils/copyToClipboard";

const StyledShareQuiz = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 3.2rem;
`;

const LinkBox = styled.div`
  display: flex;
  align-items: center;
  font-weight: 600;
  padding: 1.2rem 2.4rem;
  background: var(--color-grey-200);
  border-radius: var(--border-radius-md);
  width: 100%;
`;

const ShareButton = styled(Button)`
  background: var(--color-green-700);
  color: var(--color-grey-0);
`;

function ShareQuiz({ quizId }) {
  const quizLink = `${window.location.origin}/quiz/${quizId}`;
  function handleShareLink() {
    return copyToClipboard(quizLink);
  }

  return (
    <StyledShareQuiz>
      <Heading as="h2">Congrats your Quiz is Published!</Heading>
      <LinkBox>
        <span>{quizLink}</span>
      </LinkBox>
      <ShareButton size="extra-large" onClick={handleShareLink}>
        Share
      </ShareButton>
    </StyledShareQuiz>
  );
}

export default ShareQuiz;
