export enum IssueLevel {
  info = "info",
  warning = "warning",
  error = "error",
}

export type Issue = {
  id: string;
  projectId: string;
  name: string;
  message: string;
  stack: string;
  level: IssueLevel;
  numEvents: number;
  numUsers: number;
};

export type SelectFilterOptionType = {
  value: string;
  label: string;
};

export type FilterType = {
  status?: string;
  level?: string;
  project?: string;
};
