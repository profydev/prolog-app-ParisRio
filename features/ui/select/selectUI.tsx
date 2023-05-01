/* eslint-disable @next/next/no-img-element */
import { textFont, color, theme } from "@styles/theme";
import { useState } from "react";
import Select, {
  StylesConfig,
  components,
  DropdownIndicatorProps as DefaultDropdownIndicatorProps,
  OptionProps as DefaultOptionProps,
  PlaceholderProps as DefaultPlaceholderProps,
  SingleValueProps as DefaultSingleValueProps,
} from "react-select";
import styled, { css } from "styled-components";

//nvm use default 16.14.2

type SelectUIProps = {
  placeholder?: string;
  options: Array<SelectOption>;
  label?: string;
  hint?: string;
  error?: boolean;
  errorMessage?: string;
  iconSrc?: string;
  disabled?: boolean;
};

//Extends React-Select interfaces to consider added props for menu opening & trailing icon.
interface DropdownIndicatorProps extends DefaultDropdownIndicatorProps {
  isMenuOpen: boolean;
}

interface OptionProps extends DefaultOptionProps {
  iconSrc: string | undefined;
}

interface PlaceholderProps extends DefaultPlaceholderProps {
  iconSrc: string | undefined;
}

interface SingleValueProps extends DefaultSingleValueProps {
  iconSrc: string | undefined;
}

type SelectOption = {
  value: string;
  label: string;
};

//Wrapper for the total component
const Container = styled.div`
  width: fit-content;
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  ${textFont("sm", "medium")}
  color: ${color("gray", 700)};
`;

const Hint = styled.span<{
  error: boolean | undefined;
}>`
  ${textFont("sm", "regular")}
  ${(props) => {
    if (props.error) {
      return css`
        color: ${color("error", 500)};
      `;
    } else {
      return css`
        color: ${color("gray", 500)};
      `;
    }
  }}
`;

//Start of custom styling for the select component

//In the case of React-Select custom styles, the 'theme' object is not automatically passed to the color()
//function, as it is with styled-components. Instead, the theme object must be provided as an
//argument when calling the function returned by the color() function.
const customStyles = (error: boolean | undefined): StylesConfig => ({
  control: (provided, state) => ({
    ...provided,
    width: "320px",
    // height: "44px",
    backgroundColor: state.isDisabled
      ? `${color("gray", 50)({ theme })} `
      : "white",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: error
      ? `${color("error", 300)({ theme })} `
      : state.isFocused
      ? `${color("primary", 300)({ theme })} `
      : `${color("gray", 300)({ theme })} `,
    borderRadius: "0.5rem",
    margin: "0.375rem 0",
    padding: "0.625rem 0.875rem",
    boxShadow: error
      ? "0px 1px 2px rgba(16, 24, 40, 0.05), 0px 0px 0px 4px #FEE4E2;"
      : state.isFocused
      ? "0px 1px 2px rgba(16, 24, 40, 0.05), 0px 0px 0px 4px #F4EBFF"
      : "0px 1px 2px rgba(16, 24, 40, 0.05)",
    color: state.isDisabled
      ? `${color("primary", 500)({ theme })} `
      : `${color("gray", 900)({ theme })} `,
    "&:hover": {
      borderColor: error
        ? `${color("error", 300)({ theme })} `
        : state.isFocused
        ? `${color("primary", 300)({ theme })} `
        : `${color("gray", 300)({ theme })} `,
    },
  }),
  valueContainer: (provided) => ({
    ...provided,
    minHeight: "22px",
    padding: "0 0",
    display: "flex",
    alignItems: "center",
  }),
  singleValue: (provided) => ({
    ...provided,
    display: "flex",
    alignItems: "center",
  }),
  placeholder: (provided) => ({
    ...provided,
    display: "flex",
    alignItems: "center",
    color: `${color("gray", 500)({ theme })} `,
    margin: "0 0",
  }),
  input: (provided) => ({
    ...provided,
    padding: "0 0",
    margin: "0 0",
  }),
  indicatorSeparator: (provided) => ({
    ...provided,
    display: "none",
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    padding: "0 0",
  }),
  option: (provided, state) => ({
    ...provided,
    display: "flex",
    padding: "0.5rem 1rem 0.5rem 0.875rem",
    justifyContent: "space-between",
    color: `${color("gray", 900)({ theme })} `,
    backgroundColor: state.isFocused
      ? `${color("primary", 25)({ theme })} `
      : "white",
  }),
});

//Start of React-Select custom components definition

//Modify DropdownIndicator components to custom open and close menu icons.
const DropdownIndicator = (props: DropdownIndicatorProps) => {
  const { isMenuOpen } = props;
  return (
    <components.DropdownIndicator {...props}>
      {isMenuOpen ? (
        <img src="/icons/select-close.svg" alt="select-close-icon" />
      ) : (
        <img src="/icons/select-open.svg" alt="select-open-icon" />
      )}
    </components.DropdownIndicator>
  );
};

//Styled components for additional style 'div' and 'img' inside React-select custom components
//Used to take into account the trailing icon.
const OptionContainer = styled.div`
  display: flex;
  align-items: center;
`;

const OptionIcon = styled.img`
  padding-right: 0.75rem;
`;

//Modify Option components to implement the trailing and 'selected' icons.
const Option = (props: OptionProps) => {
  const { isSelected, children, iconSrc } = props;

  return (
    <components.Option {...props}>
      <OptionContainer>
        {iconSrc && <OptionIcon src={iconSrc} alt="select-option-icon" />}
        {children}
      </OptionContainer>
      {isSelected && (
        <img src="/icons/select-selected.svg" alt="select-selected-icon" />
      )}
    </components.Option>
  );
};

//Modify Placeholder components to implement the trailing icon.
const Placeholder = (props: PlaceholderProps) => {
  const { children, iconSrc } = props;
  return (
    <components.Placeholder {...props}>
      {iconSrc && <OptionIcon src={iconSrc} alt="select-option-icon" />}
      {children}
    </components.Placeholder>
  );
};

//Modify SingleValue components to implement the trailing icon.
const SingleValue = (props: SingleValueProps) => {
  const { children, iconSrc } = props;
  return (
    <components.SingleValue {...props}>
      {iconSrc && <OptionIcon src={iconSrc} alt="select-option-icon" />}
      {children}
    </components.SingleValue>
  );
};

export function SelectUI({
  placeholder,
  options,
  label,
  hint,
  error,
  errorMessage,
  iconSrc,
  disabled,
}: SelectUIProps) {
  //A state is used to capture menu opening and closing. Information is used for the
  //Open and close icon is the dropdown indicator
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Container>
      <Label>{label}</Label>
      <Select
        options={options}
        placeholder={placeholder}
        isDisabled={disabled}
        styles={customStyles(error)}
        onMenuOpen={() => setIsMenuOpen(true)}
        onMenuClose={() => setIsMenuOpen(false)}
        components={{
          DropdownIndicator: (props) => (
            <DropdownIndicator {...props} isMenuOpen={isMenuOpen} />
          ),
          Option: (props) => <Option {...props} iconSrc={iconSrc} />,
          Placeholder: (props) => <Placeholder {...props} iconSrc={iconSrc} />,
          SingleValue: (props) => <SingleValue {...props} iconSrc={iconSrc} />,
        }}
      />
      <Hint error={error}>{error ? errorMessage : hint}</Hint>
    </Container>
  );
}
