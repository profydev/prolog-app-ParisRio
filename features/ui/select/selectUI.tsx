import { textFont, color, theme } from "@styles/theme";
import { reduce } from "lodash";
import Select, {
  StylesConfig,
  CSSObjectWithLabel,
  GroupBase,
} from "react-select";
import styled from "styled-components";
//nvm use default 16.14.2

type SelectOption = {
  value: string;
  label: string;
};

type SelectProps = {
  placeholder?: string;
  options: Array<SelectOption>;
  label?: string;
  hint?: string;
  error?: string;
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

const SelectInput = styled.select`
  -moz-appearance: none;
  -webkit-appearance: none;
  border: 1px solid ${color("gray", 300)};
  background: white;
  border-radius: 0.5rem;
  padding: 0.625rem 0.875rem;
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
`;

const Option = styled.option`
  -moz-appearance: none;
  -webkit-appearance: none;
  padding: 0.625rem 0.875rem;
  background: white;
  box-shadow: 0px 12px 16px -4px rgba(16, 24, 40, 0.1),
    0px 4px 6px -2px rgba(16, 24, 40, 0.05);
  ${textFont("md", "regular")}
  color: ${color("gray", 900)};
`;

const Hint = styled.span`
  ${textFont("sm", "regular")}
  color: ${color("gray", 500)};
`;
//In the case of React-Select custom styles, the theme object is not automatically passed to the color()
// function, as it is with styled-components. Instead, the theme object must be provided as an
// argument when calling the function returned by the color() function.
const customStyles: StylesConfig = {
  control: (provided, state) => ({
    ...provided,
    background: "white",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: `${color("gray", 300)({ theme })}`,
    borderRadius: "0.5rem",
    padding: "0.625rem 0.875rem",
    boxShadow: "0px 1px 2px rgba(16, 24, 40, 0.05)",
  }),
};

export function SelectUI({
  placeholder,
  options,
  label,
  hint,
  error,
  iconSrc,
  disabled,
}: SelectProps) {
  return (
    <Container>
      <Label>{label}</Label>
      <Select
        options={options}
        placeholder={placeholder}
        isDisabled={disabled}
        styles={customStyles}
      />
      <Hint>{hint}</Hint>
    </Container>
  );
}
