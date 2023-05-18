import { useEffect } from "react";
import { useQuery, useQueryClient } from "react-query";
import axios from "axios";
import type { Page } from "@typings/page.types";
import type { Issue } from "../types/issue.types";

//https://prolog-api.profy.dev/issue?page=1&limit=10&status=resolved&level=warning&project=back
async function getIssues(page: number, level?: string) {
  let url = `https://prolog-api.profy.dev/issue?page=${page}`;
  console.log(level);

  if (level) {
    url = `${url}&level=${level}`;
  }
  console.log(url);

  const { data } = await axios.get(url);
  return data;
}

export function useIssues(page: number, level?: string) {
  const query = useQuery<Page<Issue>, Error>(
    ["issues", page, level],
    () => getIssues(page, level),
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
