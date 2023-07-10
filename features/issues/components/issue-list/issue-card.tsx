import styled from "styled-components";
import { color, space, textFont } from "@styles/theme";
import { Badge, BadgeColor, BadgeSize } from "@features/ui";
import { IssueLevel } from "../../types/issue.types";
import { ProjectLanguage } from "@features/projects";
import type { Issue } from "../../types/issue.types";
import { capitalize } from "lodash";

type IssueRowProps = {
  projectLanguage: ProjectLanguage;
  issue: Issue;
};

const levelColors = {
  [IssueLevel.info]: BadgeColor.success,
  [IssueLevel.warning]: BadgeColor.warning,
  [IssueLevel.error]: BadgeColor.error,
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-bottom: ${space(4)};
  padding: ${space(6)};
  background: white;
  box-shadow: 0px 1px 3px rgba(16, 24, 40, 0.1),
    0px 1px 2px rgba(16, 24, 40, 0.06);
  border-radius: 8px;
`;

//Parent container for the callstack message that need the following property for text overflow to work
//https://stackoverflow.com/questions/17779293/css-text-overflow-ellipsis-not-working
//So if you reach this question because you're having trouble trying to get the ellipsis working
// inside a display: flex container, try adding min-width: 0 to the outmost container that's overflowing
//its parent even though you already set a overflow: hidden to it and see how that works for you
const ErrorContainer = styled.div`
  min-width: 0;
`;

const ErrorAndIconContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${space(10)};
`;

const LanguageIcon = styled.img`
  margin-right: ${space(3)};
`;

const ErrorTypeAndMessage = styled.div`
  color: ${color("gray", 900)};
  white-space: nowrap; /* keep text on a single line */
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ErrorType = styled.span`
  ${textFont("sm", "medium")}
`;

const StackMessage = styled.div`
  color: ${color("gray", 500)};
  ${textFont("sm", "regular")}
  min-width: 0;
  white-space: nowrap; /* keep text on a single line */
  overflow: hidden;
  text-overflow: ellipsis;
`;

const InfoContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Issues = styled.div`
  margin-left: ${space(6)};

  &:first-of-type {
    margin-left: 0;
  }
`;

const IssuesTitle = styled.div`
  margin-bottom: ${space(2)};
  color: ${color("gray", 500)};
  ${textFont("sm", "medium")}
  text-align: center;
`;

const IssuesNumber = styled.div`
  color: ${color("gray", 500)};
  ${textFont("sm", "regular")}
  text-align: center;
`;

export function IssueCard({ projectLanguage, issue }: IssueRowProps) {
  const { name, message, stack, level, numEvents, numUsers } = issue;
  const firstLineOfStackTrace = stack.split("\n")[1];
  return (
    <Container>
      <ErrorAndIconContainer>
        <LanguageIcon
          src={`/icons/${projectLanguage}.svg`}
          alt={projectLanguage}
        />
        <ErrorContainer>
          <ErrorTypeAndMessage>
            <ErrorType>{name}:&nbsp;</ErrorType>
            {message}
          </ErrorTypeAndMessage>
          <StackMessage>{firstLineOfStackTrace}</StackMessage>
        </ErrorContainer>
      </ErrorAndIconContainer>
      <InfoContainer>
        <Issues>
          <IssuesTitle>Status</IssuesTitle>
          <Badge color={levelColors[level]} size={BadgeSize.sm}>
            {capitalize(level)}
          </Badge>
        </Issues>
        <Issues>
          <IssuesTitle>Event</IssuesTitle>
          <IssuesNumber>{numEvents}</IssuesNumber>
        </Issues>
        <Issues>
          <IssuesTitle>Users</IssuesTitle>
          <IssuesNumber>{numUsers}</IssuesNumber>
        </Issues>
      </InfoContainer>
    </Container>
  );
}
