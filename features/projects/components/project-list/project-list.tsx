import styled, { keyframes } from "styled-components";
import { ProjectCard } from "../project-card";
import { useProjects } from "../../api/use-projects";
import { breakpoint, color, space } from "@styles/theme";

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

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const LoadingIndicator = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
  animation: ${rotate} 2s linear infinite;
`;

const ExteriorCircle = styled.div`
  height: 64px;
  width: 64px;
  background-color: ${color("primary", 50)};
  border-radius: 50%;
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
`;

const QuarterCircle = styled.div`
  height: 32px;
  width: 32px;
  background-color: ${color("primary", 600)};
  border-radius: 0 32px 0 0;
  top: 0;
  right: 0;
  position: absolute;
  z-index: 3;
`;
const QuarterCircleEndTop = styled.div`
  height: 6px;
  width: 6px;
  background-color: ${color("primary", 600)};
  border-radius: 6px;
  top: 0;
  position: absolute;
  z-index: 3;
`;
const QuarterCircleEndBottom = styled.div`
  height: 6px;
  width: 6px;
  background-color: ${color("primary", 600)};
  border-radius: 6px;
  right: 0;
  position: absolute;
  z-index: 3;
`;

const InteriorCircle = styled.div`
  height: 52px;
  width: 52px;
  background-color: white;
  border-radius: 50%;
  position: absolute;
  z-index: 3;
`;

export function ProjectList() {
  const { data, isLoading, isError, error } = useProjects();
  //if (isLoading)
  if (isLoading) {
    return <LoadingIndicator>Yo</LoadingIndicator>;
  }

  if (isError) {
    console.error(error);
    return <div>Error: {error.message}</div>;
  }

  return (
    <LoadingIndicator>
      <ExteriorCircle>
        <QuarterCircle />
        <QuarterCircleEndTop />
        <QuarterCircleEndBottom />
        <InteriorCircle />
      </ExteriorCircle>
    </LoadingIndicator>
  );

  // return (
  //   <List>
  //     {data?.map((project) => (
  //       <li key={project.id}>
  //         <ProjectCard project={project} />
  //       </li>
  //     ))}
  //   </List>
  // );
}
