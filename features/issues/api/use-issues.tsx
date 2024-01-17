import { useEffect } from "react";
import { useInfiniteQuery, useQuery, useQueryClient } from "react-query";
import axios from "axios";
import type { Page } from "@typings/page.types";
import type { Issue } from "../types/issue.types";

//Typical api endpoint:
//https://prolog-api.profy.dev/issue?page=1&limit=10&status=resolved&level=warning&project=back
async function getIssues(
  page: number,
  status?: string,
  level?: string,
  project?: string
) {
  let url = `https://prolog-api.profy.dev/issue?page=${page}`;

  if (status) {
    url = `${url}&status=${status}`;
  }
  if (level) {
    url = `${url}&level=${level}`;
  }
  if (project) {
    url = `${url}&project=${project}`;
    //Example of project name in the API
    //"ML Service",
    //"Backend"
    //"Frontend - Web"
  }

  const { data } = await axios.get(url);
  return data;
}

export function useInfiniteIssues(
  status?: string,
  level?: string,
  project?: string
) {
  const query = useInfiniteQuery<Page<Issue>, Error>(
    ["issues", status, level, project],
    ({ pageParam = 1 }) => getIssues(pageParam, status, level, project),
    {
      getNextPageParam: (lastPage) => {
        // If there's a next page, return the next page number, else return undefined
        return lastPage.meta.hasNextPage
          ? lastPage.meta.currentPage + 1
          : undefined;
      },
      staleTime: 60000,
    }
  );
  return query;
}

export function useIssues(
  page: number,
  status?: string,
  level?: string,
  project?: string
) {
  const query = useQuery<Page<Issue>, Error>(
    ["issues", page, status, level, project],
    () => getIssues(page, status, level, project),
    { keepPreviousData: true, staleTime: 60000 }
  );

  // Prefetch the next page!
  const queryClient = useQueryClient();

  useEffect(() => {
    if (query.data?.meta.hasNextPage) {
      queryClient.prefetchQuery(
        ["projects", page + 1, status, level, project],
        () => getIssues(page + 1, status, level, project)
      );
    }
  }, [query.data, page, status, level, project, queryClient]);
  return query;
}
