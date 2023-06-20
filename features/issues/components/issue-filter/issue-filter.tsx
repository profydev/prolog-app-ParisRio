import { Input, SelectUI } from "@features/ui";
import { space, breakpoint } from "@styles/theme";
import { useRouter } from "next/router";
import { useState } from "react";
import { ActionMeta } from "react-select";
import styled from "styled-components";
import { useDebouncedCallback } from "use-debounce";

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
  status?: string;
  level?: string;
  project?: string;
};

const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;
  @media (min-width: ${breakpoint("desktop")}) {
    flex-direction: row;
    justify-content: flex-end;
  }
`;
const StatusSelect = styled(SelectUI)`
  margin-bottom: ${space(4)};
  width: 100%;
  @media (min-width: ${breakpoint("desktop")}) {
    margin-right: ${space(4)};
    width: 10rem;
  }
`;
const LevelSelect = styled(SelectUI)`
  margin-bottom: ${space(4)};
  width: 100%;
  @media (min-width: ${breakpoint("desktop")}) {
    margin-right: ${space(4)};
    width: 10rem;
  }
`;
const SearchInput = styled(Input)`
  width: 100%;
  @media (min-width: ${breakpoint("desktop")}) {
    width: 17.5rem;
  }
`;

const useFilter = () => {
  const router = useRouter();
  const filters = {
    status: router.query.status,
    level: router.query.level,
    project: router.query.project,
  } as FilterType;

  const handleFilters = (newFilter: FilterType) => {
    //console.log(newFilter);

    let query = { ...router.query };
    //need to handle the cases where a select or input is reset (value set to undefined), then the query should be deleted
    for (const key in newFilter) {
      //We will use FilterType keys to loop through query which is of type QueryType
      //we need to ensutre that we match the correct keys between the two types

      const value = newFilter[key as keyof FilterType];

      if (value === undefined || value === "") {
        //check if this key is present in the existing query and if yes remove it
        if (key in query) {
          delete query[key];
        }
      }
      //if the newFilter value exist, push it to the query.
      //Page value is reset to 1 when a new filter is applied
      else {
        query = { ...query, [key]: value, page: "1" };
      }
    }
    router.push({ query });
    //if one of the property of newFilter is undefined then remove the query
  };
  return { filters, handleFilters };
};

export function IssueFilter() {
  const { filters, handleFilters } = useFilter();
  const [searchInputText, setSearchInputText] = useState(filters.project || "");
  const debounced = useDebouncedCallback((value: FilterType) => {
    handleFilters(value);
    //console.log('debounce fires');
  }, 300);

  //Initiate the Select and Input components with the filter object obtained from getFilter
  const getStatusSelectDefaultValue = (filters: FilterType) => {
    if (filters.status === "open") {
      return { value: "open", label: "Unresolved" };
    } else if (filters.status === "resolved") {
      return { value: "resolved", label: "Resolved" };
    }
  };

  const getLevelSelectDefaultValue = (filters: FilterType) => {
    if (filters.level === "error") {
      return { value: "error", label: "Error" };
    } else if (filters.level === "warning") {
      return { value: "warning", label: "Warning" };
    } else if (filters.level === "info") {
      return { value: "info", label: "Info" };
    }
  };

  const handleSelectChange = (
    selectedOption: unknown,
    actionMeta: ActionMeta<unknown>
  ) => {
    //React-select selectedOption is of unknown type by default, did not find anyway to change it

    //get access to Select name through actionMeta
    const { name } = actionMeta;
    if (selectedOption) {
      const option = selectedOption as OptionType;
      //console.log(option);
      if (name === "level") {
        handleFilters({ level: option.value });
      } else if (name === "status") {
        handleFilters({ status: option.value });
      }
    } else if (selectedOption === null) {
      if (name === "level") {
        handleFilters({ level: undefined });
      } else if (name === "status") {
        handleFilters({ status: undefined });
      }
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    debounced({ project: event.target.value });
    setSearchInputText(event.target.value);
  };

  return (
    <FilterContainer>
      <StatusSelect
        name="status"
        options={statusOptions}
        placeholder="Status"
        isClearable
        defaultValue={getStatusSelectDefaultValue(filters)}
        onChange={handleSelectChange}
      />
      <LevelSelect
        name="level"
        options={levelOptions}
        placeholder="Level"
        isClearable
        defaultValue={getLevelSelectDefaultValue(filters)}
        onChange={handleSelectChange}
      />
      <SearchInput
        name="project"
        placeholder="Project Name"
        value={searchInputText}
        leadingIconSrc="/icons/search.svg"
        onChange={handleInputChange}
      />
    </FilterContainer>
  );
}
