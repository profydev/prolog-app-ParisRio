import Link from "next/link";
import styled from "styled-components";
import { color, space, textFont, displayFont } from "@styles/theme";
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
  background: white;
  box-shadow: 0px 1px 3px rgba(16, 24, 40, 0.1),
    0px 1px 2px rgba(16, 24, 40, 0.06);
  border-radius: 8px;
`;

const TopContainer = styled.div`
  padding: ${space(6)};
`;

const BottomContainer = styled.div`
  padding: ${space(4, 6)};
  border-top: 1px solid ${color("gray", 200)};
  display: flex;
  justify-content: flex-end;
`;

const NameAndIconContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${space(6)};
`;

const LanguageIcon = styled.img`
  margin-right: ${space(3)};
`;

const Name = styled.div`
  ${textFont("md", "medium")}
`;

const Language = styled.div`
  color: ${color("gray", 500)};
  ${textFont("sm", "regular")}
`;

const InfoContainer = styled.div`
  display: flex;
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
`;

const IssuesNumber = styled.div`
  ${displayFont("md", "semibold")}
`;

const Status = styled.div`
  // line-height of issue number element
  height: 2.75rem;
  margin-top: auto;
  margin-left: ${space(6)};
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex: 1;
`;

const ViewIssuesAnchor = styled.a`
  text-decoration: none;
  ${textFont("sm", "medium")}
`;

export function IssueCard({ projectLanguage, issue }: IssueRowProps) {
  const { name, message, stack, level, numEvents, numUsers } = issue;
  const firstLineOfStackTrace = stack.split("\n")[1];
  return (
    <Container>
      <TopContainer>
        <NameAndIconContainer>
          <LanguageIcon
            src={`/icons/${projectLanguage}.svg`}
            alt={projectLanguage}
          />
          <div>
            <Name>{name}:&nbsp;</Name>
            <div>{message}</div>
            <Language>{firstLineOfStackTrace}</Language>
          </div>
        </NameAndIconContainer>
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
      </TopContainer>
    </Container>
  );
}
