import { Input, SelectUI } from "@features/ui";
import { space } from "@styles/theme";
import { useState } from "react";
import styled from "styled-components";

type OptionType = {
  value: string;
  label: string;
};

const statusOptions: OptionType[] = [
  { value: "open", label: "Unresolved" },
  { value: "resolved", label: "Resolved" },
];
const levelOptions: OptionType[] = [
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

type issueFilterProps = {
  navigateToPage: (newPage: number, newLevel?: string) => void;
};

export function IssueFilter({ navigateToPage }: issueFilterProps) {
  const handleChange = (selectedOption: unknown) => {
    console.log(selectedOption);
    //Need to by pass react-select defining the option as unknown type.
    if (selectedOption === null) {
      navigateToPage(1);
    } else {
      const option = selectedOption as OptionType;
      if (option.value) {
        navigateToPage(1, option.value);
      }
    }
  };

  return (
    <FilterContainer>
      <StatusSelect options={statusOptions} placeholder="Status" isClearable />
      <LevelSelect
        options={levelOptions}
        placeholder="Level"
        isClearable
        onChange={handleChange}
      />
      <SearchInput
        placeholder="Project Name"
        leadingIconSrc="/icons/search.svg"
      />
    </FilterContainer>
  );
}
