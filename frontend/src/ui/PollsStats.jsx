import styled from "styled-components";
import { FormatDigit } from "../utils/formatDigit";

const OptionBox = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  gap: 4.8rem;
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-md);
  padding: 1.8rem 2rem;
  background-color: var(--color-grey-100);
  font-weight: 600;

  & span {
    font-size: 3rem;
  }
  & p {
    margin-top: 0.5rem;
    font-size: 1.4rem;
  }
`;

function PollsStats({ options }) {
  return options.map((option, index) => {
    return (
      <>
        <OptionBox>
          <span>{FormatDigit(option.attemptCount)}</span>
          <p>Option {index + 1}</p>
        </OptionBox>
      </>
    );
  });
}

export default PollsStats;
