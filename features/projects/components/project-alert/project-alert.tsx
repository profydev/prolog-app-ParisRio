import styled from "styled-components";
import { textFont, color, space, breakpoint } from "@styles/theme";
import { UseQueryResult } from "react-query";

type ProjectAlertProps = {
  refetch: (options?: {
    throwOnError: boolean;
    cancelRefetch?: boolean;
  }) => Promise<UseQueryResult>;
};

const AlertContainer = styled.div`
  display: flex;
  align-items: center;
  box-sizing: border-box;
  height: 4.5rem;
  padding: ${space(4)};
  border-radius: ${space(2)};
  border: 1px solid ${color("error", 300)};
  background-color: ${color("error", 25)};
  color: ${color("error", 700)};
  ${textFont("sm", "medium")};

  @media (min-width: ${breakpoint("desktop")}) {
    height: 3.25rem;
  }
`;

const AlertIcon = styled.img`
  padding-right: ${space(4)};
`;
const AlertMessage = styled.div`
  color: ${color("error", 700)};
`;
const AlertButton = styled.div`
  display: flex;
  margin-left: auto;
  cursor: pointer;
`;
const AlertButtonText = styled.div`
  color: ${color("error", 700)};
  padding-right: ${space(3)};
  min-width: 3.875rem;
`;
const AlertButtonArrow = styled.img``;

export function ProjectAlert({ refetch }: ProjectAlertProps) {
  return (
    <AlertContainer>
      <AlertIcon src="/icons/alert-circle.svg" alt="logo" />
      <AlertMessage>
        There was a problem while loading the project data
      </AlertMessage>
      <AlertButton onClick={() => refetch()}>
        <AlertButtonText>Try again </AlertButtonText>
        <AlertButtonArrow src="/icons/alert-arrow.svg" alt="logo" />
      </AlertButton>
    </AlertContainer>
  );
}
