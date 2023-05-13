import { Input, SelectUI } from "@features/ui";
import { space } from "@styles/theme";
import styled from "styled-components";

const status = [
  { value: "open", label: "Unresolved" },
  { value: "resolved", label: "Resolved" },
];
const level = [
  { value: "error", label: "Error" },
  { value: "warning", label: "Warning" },
  { value: "info", label: "Info" },
];

const FilterContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1.5rem;
`;
const StatusSelect = styled(SelectUI)`
  margin-right: ${space(4)};
  width: 10rem;
`;
const LevelSelect = styled(SelectUI)`
  margin-right: ${space(4)};
  width: 10rem;
`;
const SearchInput = styled(Input)`
  width: 17.5rem;
`;

export function IssueFilter() {
  return (
    <FilterContainer>
      <StatusSelect options={status} placeholder="Status" />
      <LevelSelect options={level} placeholder="Level" />
      <SearchInput
        placeholder="Project Name"
        leadingIconSrc="/icons/search.svg"
      />
    </FilterContainer>
  );
}
