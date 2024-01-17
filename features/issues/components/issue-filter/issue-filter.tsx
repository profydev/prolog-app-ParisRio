import {
  FilterType,
  SelectFilterOptionType,
} from "@features/issues/types/issue.types";
import { Input, SelectUI } from "@features/ui";
import { space, breakpoint } from "@styles/theme";
import { useRouter } from "next/router";
import { useState } from "react";
import { ActionMeta } from "react-select";
import styled from "styled-components";
import { useDebouncedCallback } from "use-debounce";

const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${space(6)};
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

//Hook to obtain filter params from the url query params
//Url query params are the source of thruth for the component and they are passed to the Selects or the Input
//When the Selects or Input provide a new value, the router queries are updated

const useFilter = () => {
  const router = useRouter();
  const filters = {
    status: router.query.status,
    level: router.query.level,
    project: router.query.project,
  } as FilterType;

  const handleFilters = (newFilter: FilterType) => {
    let query = { ...router.query };
    //Need to handle the cases where a select or input is reset (value set to undefined),
    //Then the query should be deleted and page is reset
    for (const key in newFilter) {
      //Use FilterType keys to loop through query which is of type QueryType
      const value = newFilter[key as keyof FilterType];
      if (value === undefined || value === "") {
        if (key in query) {
          delete query[key];
          query = { ...query, page: "1" };
        }
      }
      //If the newFilter value exist, push it to the router query and reset the page number.
      else {
        query = { ...query, [key]: value, page: "1" };
      }
    }
    router.push({ query });
  };
  return { filters, handleFilters };
};

const statusOptions: SelectFilterOptionType[] = [
  { value: "open", label: "Unresolved" },
  { value: "resolved", label: "Resolved" },
];
const levelOptions: SelectFilterOptionType[] = [
  { value: "error", label: "Error" },
  { value: "warning", label: "Warning" },
  { value: "info", label: "Info" },
];

export function IssueFilter() {
  const { filters, handleFilters } = useFilter();

  //Input is handled differently than the Select, the return value needs to be debounced
  //The useState is needed to get the 'current' value of Input and control it
  //Te filter project value is debounced (available only every 300 ms)
  const [searchInputText, setSearchInputText] = useState(filters.project || "");
  const debounced = useDebouncedCallback((value: FilterType) => {
    handleFilters(value);
  }, 300);

  //Initiate the Select components with the filter values object obtained from useFilter hook
  const getSelectDefaultValue = (
    filter: string | undefined,
    selectOption: SelectFilterOptionType[]
  ) => {
    const defautValue = selectOption.find((option) => option.value === filter);
    return defautValue;
  };

  const handleSelectChange = (
    selectedOption: unknown,
    actionMeta: ActionMeta<unknown>
  ) => {
    //React-select selectedOption is of unknown type by default, did not find anyway to change it to project option type
    //Get access to Select name through actionMeta
    const { name } = actionMeta;
    //Handle case where a value is provided or emptied (convert from null to undefined)
    if (selectedOption && name) {
      const option = selectedOption as SelectFilterOptionType;
      handleFilters({ [name]: option.value });
    } else if (selectedOption === null && name) {
      handleFilters({ [name]: undefined });
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
        defaultValue={getSelectDefaultValue(filters.status, statusOptions)}
        onChange={handleSelectChange}
      />
      <LevelSelect
        name="level"
        options={levelOptions}
        placeholder="Level"
        isClearable
        defaultValue={getSelectDefaultValue(filters.level, levelOptions)}
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
