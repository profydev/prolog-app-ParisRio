import styled from "styled-components";
import { ProjectCard } from "../project-card";
import { useProjects } from "../../api/use-projects";
import { breakpoint, space } from "@styles/theme";
import { LoadingIndicator } from "@features/ui";
import { ProjectAlert } from "../project-alert";

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
  @media (min-width: ${breakpoint("desktop")}) {
    margin-top: 8.5rem;
  }
`;

export function ProjectList() {
  const { data, isLoading, isError, error, refetch } = useProjects();

  if (isLoading) {
    return (
      <LoadingIndicatorContainer>
        <LoadingIndicator />
      </LoadingIndicatorContainer>
    );
  }

  if (isError) {
    console.error(error);
    return <ProjectAlert refetch={refetch} />;
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
