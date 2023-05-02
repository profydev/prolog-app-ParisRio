import { textFont, color, theme } from "@styles/theme";
import styled, { css } from "styled-components";

//nvm use default 16.14.2

type InputProps = {
  placeholder?: string;
  label?: string;
  hint?: string;
  error?: boolean;
  errorMessage?: string;
  iconSrc?: string;
  disabled?: boolean;
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

const InputField = styled.input``;

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

export function Input({
  placeholder,
  label,
  hint,
  error,
  errorMessage,
  iconSrc,
  disabled,
}: InputProps) {
  return (
    <Container>
      <Label>{label}</Label>
      <InputField type="text" />
      <Hint error={error}>{error ? errorMessage : hint}</Hint>
    </Container>
  );
}
