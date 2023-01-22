import styled from "styled-components";
import { ProjectCard } from "../project-card";
import { useProjects } from "../../api/use-projects";
import { breakpoint, color, space, textFont } from "@styles/theme";
import { LoadingIndicator } from "@features/ui";

const List = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: ${space(6)};

  // reset list styles
  list-style: none;
  padding: 0;
  margin: 0;

  @media (min-width: ${breakpoint("desktop")}) {
    grid-template-columns: repeat(auto-fit, 400px);
  }
`;
const LoadingIndicatorContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10rem;
  @media screen {
    margin-top: 8.5rem;
  }
`;

const AlertContainer = styled.div`
  display: flex;
  align-items: center;
  padding: ${space(4)};
  border-radius: ${space(2)};
  border: 1px solid ${color("error", 300)};
  background-color: ${color("error", 25)};
  color: ${color("error", 700)};
  ${textFont("sm", "medium")};
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
`;
const AlertButtonText = styled.div`
  color: ${color("error", 700)};
  padding-right: ${space(3)};
`;
const AlertButtonArrow = styled.img``;

export function ProjectList() {
  const { data, isLoading, isError, error } = useProjects();

  return (
    <AlertContainer>
      <AlertIcon src="/icons/alert-circle.svg" alt="logo" />
      <AlertMessage>
        There was a problem while loading the project data
      </AlertMessage>
      <AlertButton>
        <AlertButtonText>Try again</AlertButtonText>
        <AlertButtonArrow src="/icons/alert-arrow.svg" alt="logo" />
      </AlertButton>
    </AlertContainer>
  );

  if (isLoading) {
    return (
      <LoadingIndicatorContainer>
        <LoadingIndicator />
      </LoadingIndicatorContainer>
    );
  }

  if (isError) {
    console.error(error);
    //return <div>Error: {error.message}</div>;
    return (
      <AlertContainer>
        <AlertIcon src="/icons/alert-circle.svg" alt="logo" />
        <AlertMessage>
          There was a problem while loading the project data
        </AlertMessage>
        <AlertButton>
          <AlertButtonText>Try again</AlertButtonText>
          <AlertButtonArrow src="/icons/alert-arrow.svg" alt="logo" />
        </AlertButton>
      </AlertContainer>
    );
  }

  return (
    <List>
      {data?.map((project) => (
        <li key={project.id}>
          <ProjectCard project={project} />
        </li>
      ))}
    </List>
  );
}
