import { Input, SelectUI } from "@features/ui";
import { space } from "@styles/theme";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
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

type FilterType = {
  page: number;
  status: string | undefined;
  level: string | undefined;
  project: string | undefined;
};

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
  setFilter: Dispatch<SetStateAction<FilterType>>;
};

export function IssueFilter({ setFilter }: issueFilterProps) {
  const handleSelectChange =
    (identifyer: string) => (selectedOption: unknown) => {
      console.log(selectedOption);
      console.log(identifyer);
      if (selectedOption === null) {
        setFilter((previous) => {
          return {
            ...previous,
            [identifyer]: undefined,
          };
        });
      } else {
        //Need to by pass react-select defining the option as unknown type.
        const option = selectedOption as OptionType;
        setFilter((previous) => {
          return {
            ...previous,
            [identifyer]: option.value,
          };
        });
      }
    };

  const handleProjectInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value !== "") {
      setFilter((previous) => {
        return {
          ...previous,
          project: event.target.value,
        };
      });
    } else {
      setFilter((previous) => {
        return {
          ...previous,
          project: undefined,
        };
      });
    }
  };

  return (
    <FilterContainer>
      <StatusSelect
        options={statusOptions}
        placeholder="Status"
        isClearable
        onChange={handleSelectChange("status")}
      />
      <LevelSelect
        options={levelOptions}
        placeholder="Level"
        isClearable
        onChange={handleSelectChange("level")}
      />
      <SearchInput
        placeholder="Project Name"
        leadingIconSrc="/icons/search.svg"
        onChange={handleProjectInput}
      />
    </FilterContainer>
  );
}
