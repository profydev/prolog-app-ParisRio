import { useEffect } from "react";
import { useQuery, useQueryClient } from "react-query";
import axios from "axios";
import type { Page } from "@typings/page.types";
import type { Issue } from "../types/issue.types";

//https://prolog-api.profy.dev/issue?page=1&limit=10&status=resolved&level=warning&project=back
async function getIssues(
  page: number,
  status?: string,
  level?: string,
  project?: string
) {
  let url = `https://prolog-api.profy.dev/issue?page=${page}`;
  //console.log(level);
  //console.log(status);

  if (status) {
    url = `${url}&status=${status}`;
  }
  if (level) {
    url = `${url}&level=${level}`;
  }
  if (project) {
    url = `${url}&project=${project}`;
    //"ML Service",
    //"Backend"
    //"Frontend - Web"
  }
  //console.log(url);

  const { data } = await axios.get(url);
  return data;
}

export function useIssues(
  page: number,
  status?: string,
  level?: string,
  project?: string
) {
  //console.log(`useIssues is fired with project: ${project}`);

  const query = useQuery<Page<Issue>, Error>(
    ["issues", page, status, level, project],
    () => getIssues(page, status, level, project),
    { keepPreviousData: true, staleTime: 60000 }
  );

  // Prefetch the next page!
  const queryClient = useQueryClient();
  useEffect(() => {
    if (query.data?.meta.hasNextPage) {
      queryClient.prefetchQuery(["projects", page + 1], () =>
        getIssues(page + 1)
      );
    }
  }, [query.data, page, queryClient]);
  return query;
}
