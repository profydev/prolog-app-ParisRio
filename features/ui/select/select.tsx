import { textFont, color } from "@styles/theme";
import styled from "styled-components";

type SelectProps = {
  options: Array<string>;
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

export function Select({
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
      <SelectInput>
        {options.map((option, index) => (
          <Option key={index}>{option}</Option>
        ))}
      </SelectInput>
      <Hint>{hint}</Hint>
    </Container>
  );
}
