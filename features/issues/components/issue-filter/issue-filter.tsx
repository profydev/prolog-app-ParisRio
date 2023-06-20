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

//Hook to obtain filter params from the url query params
//Url query params are the source of thruth for the component and they are passed to the Selects or inputs
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
    //Then the query should be deleted
    for (const key in newFilter) {
      //Use FilterType keys to loop through query which is of type QueryType
      //Provide the type for the key
      const value = newFilter[key as keyof FilterType];
      if (value === undefined || value === "") {
        //Check if this key is present in the existing query, if yes remove it
        if (key in query) {
          delete query[key];
        }
      }
      //If the newFilter value exist, push it to the router query.
      //Page value is reset to 1 when a new filter is applied.
      else {
        query = { ...query, [key]: value, page: "1" };
      }
    }
    router.push({ query });
  };
  return { filters, handleFilters };
};

export function IssueFilter() {
  const { filters, handleFilters } = useFilter();

  //Input is handled differently than the Select, the return value needs to be debounced
  //The useState is needed to get the 'current' value of Input and control it
  //Te filter project value is debounced (available every 300 ms)
  const [searchInputText, setSearchInputText] = useState(filters.project || "");
  const debounced = useDebouncedCallback((value: FilterType) => {
    handleFilters(value);
  }, 300);

  //Initiate the Select components with the filter values object obtained from useFilter hook
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

  //Wrapper to handle Select value change and trigger handleFilters from useFilter hook
  const handleSelectChange = (
    selectedOption: unknown,
    actionMeta: ActionMeta<unknown>
  ) => {
    //React-select selectedOption is of unknown type by default, did not find anyway to change it to our option type

    //Get access to Select name through actionMeta
    const { name } = actionMeta;
    //Handle case where a value is provided or emptied (convert from null to undefined)
    if (selectedOption) {
      const option = selectedOption as OptionType;
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

  //Wrapper to handle Input value and trigger handleFilters from useFilter hook after a debounce
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
