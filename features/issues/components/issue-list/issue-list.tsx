import { useRouter } from "next/router";
import styled from "styled-components";
import {
  FilterType,
  IssueFilter,
  useIssues,
  IssueCard,
  useInfiniteIssues,
} from "@features/issues";
import { ProjectLanguage, useProjects } from "@features/projects";
import { color, space, textFont, theme, breakpoint } from "@styles/theme";
import { IssueRow } from "./issue-row";
import { useIsDesktop } from "@hooks/useIsDesktop";

const TableContainer = styled.div`
  background: white;
  border: 1px solid ${color("gray", 200)};
  box-sizing: border-box;
  box-shadow: 0px 4px 8px -2px rgba(16, 24, 40, 0.1),
    0px 2px 4px -2px rgba(16, 24, 40, 0.06);
  border-radius: ${space(2)};
  overflow: hidden;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const HeaderRow = styled.tr`
  border-bottom: 1px solid ${color("gray", 200)};
`;

const HeaderCell = styled.th`
  padding: ${space(3, 6)};
  text-align: left;
  color: ${color("gray", 500)};
  ${textFont("xs", "medium")};
`;

const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${space(4, 6)};
  border-top: 1px solid ${color("gray", 200)};
`;

const PaginationButton = styled.button`
  height: 38px;
  padding: ${space(0, 4)};
  background: white;
  border: 1px solid ${color("gray", 300)};
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
  border-radius: 6px;
  width: 100%;

  &:not(:first-of-type) {
    margin-left: ${space(3)};
  }
  @media (min-width: ${breakpoint("desktop")}) {
    width: unset;
  }
`;

const PageInfo = styled.div`
  color: ${color("gray", 700)};
  ${textFont("sm", "regular")}
`;

const PageNumber = styled.span`
  ${textFont("sm", "medium")}
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0;
`;

const breakpointDesktop = breakpoint("desktop")({ theme });
const themeDestkopWidth = parseFloat(breakpointDesktop) * 16;

export function IssueList() {
  const router = useRouter();
  const page = Number(router.query.page || 1);
  const isDesktop = useIsDesktop(themeDestkopWidth);

  const filters = {
    status: router.query.status,
    level: router.query.level,
    project: router.query.project,
  } as FilterType;

  const navigateToPage = (newPage: number) => {
    //other queries from the filter may be present and thus merged to the new query
    const query = { ...router.query, page: newPage };
    router.push({ query });
  };

  const issuesPage = useIssues(
    page,
    filters.status,
    filters.level,
    filters.project
  );
  const projects = useProjects();

  const infiniteIssuesPage = useInfiniteIssues(
    filters.status,
    filters.level,
    filters.project
  );

  if (projects.isLoading || issuesPage.isLoading) {
    return <div>Loading</div>;
  }

  if (projects.isError) {
    console.error(projects.error);
    return <div>Error loading projects: {projects.error.message}</div>;
  }

  if (issuesPage.isError) {
    console.error(issuesPage.error);
    return <div>Error loading issues: {issuesPage.error.message}</div>;
  }

  const projectIdToLanguage = (projects.data || []).reduce(
    (prev, project) => ({
      ...prev,
      [project.id]: project.language,
    }),
    {} as Record<string, ProjectLanguage>
  );
  const { items, meta } = issuesPage.data || {};

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    infiniteIssuesPage || {};

  return (
    <>
      <IssueFilter />
      {!isDesktop && (
        <>
          <List>
            {
              data?.pages.map((page) =>
                (page.items || []).map((issue) => (
                  <IssueCard
                    key={issue.id}
                    issue={issue}
                    projectLanguage={projectIdToLanguage[issue.projectId]}
                  />
                ))
              )
              //working but next is adjusting the scroll position for the new items to load below the view
              //not up
              //update as well the query handling, not working well at the moment
            }
          </List>
          <PaginationButton
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage || isFetchingNextPage}
          >
            Load more
          </PaginationButton>
        </>
      )}
      {isDesktop && (
        <TableContainer>
          <Table>
            <thead>
              <HeaderRow>
                <HeaderCell>Issue</HeaderCell>
                <HeaderCell>Level</HeaderCell>
                <HeaderCell>Events</HeaderCell>
                <HeaderCell>Users</HeaderCell>
              </HeaderRow>
            </thead>
            <tbody>
              {(items || []).map((issue) => (
                <IssueRow
                  key={issue.id}
                  issue={issue}
                  projectLanguage={projectIdToLanguage[issue.projectId]}
                />
              ))}
            </tbody>
          </Table>
          <PaginationContainer>
            <div>
              <PaginationButton
                onClick={() => navigateToPage(page - 1)}
                disabled={page === 1}
              >
                Previous
              </PaginationButton>
              <PaginationButton
                onClick={() => navigateToPage(page + 1)}
                disabled={page === meta?.totalPages}
              >
                Next
              </PaginationButton>
            </div>
            <PageInfo>
              Page <PageNumber>{meta?.currentPage}</PageNumber> of{" "}
              <PageNumber>{meta?.totalPages}</PageNumber>
            </PageInfo>
          </PaginationContainer>
        </TableContainer>
      )}
    </>
  );
}
