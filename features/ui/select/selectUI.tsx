import { textFont, color, theme } from "@styles/theme";
import { log } from "console";
import { useState } from "react";
import Select, {
  StylesConfig,
  components,
  DropdownIndicatorProps as DefaultDropdownIndicatorProps,
} from "react-select";
import styled, { css } from "styled-components";

//nvm use default 16.14.2

interface DropdownIndicatorProps extends DefaultDropdownIndicatorProps {
  isMenuOpen: boolean;
}

type SelectOption = {
  value: string;
  label: string;
};

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
//In the case of React-Select custom styles, the theme object is not automatically passed to the color()
// function, as it is with styled-components. Instead, the theme object must be provided as an
// argument when calling the function returned by the color() function.
const customStyles = (error: boolean | undefined): StylesConfig => ({
  control: (provided, state) => ({
    ...provided,
    width: "320px",
    height: "44px",
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
  valueContainer: (provided, state) => ({
    ...provided,
    padding: "0 0",
  }),
  placeholder: (provided, state) => ({
    ...provided,
    color: `${color("gray", 500)({ theme })} `,
    margin: "0 0",
  }),
  indicatorSeparator: (provided, state) => ({
    ...provided,
    display: "none",
  }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
    padding: "0 0",
  }),
});

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
        }}
      />
      <Hint error={error}>{error ? errorMessage : hint}</Hint>
    </Container>
  );
}
