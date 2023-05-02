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

const InputField = styled.input<{
  error: boolean | undefined;
}>`
  //remove basic style
  all: unset;
  width: 320px;
  height: 44px;
  padding: 0.625rem 0.875rem;
  margin: 0.375rem 0rem;
  background: #ffffff;
  ${textFont("md", "regular")};
  color: ${color("gray", 900)};
  border: 1px solid ${color("gray", 300)};
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
  border-radius: 8px;
  box-sizing: border-box;
  &::placeholder {
    color: ${color("gray", 500)};
    opacity: 1;
  }
  &:focus {
    border: 1px solid ${color("primary", 300)};
    box-shadow: 0px 0px 0px 4px ${color("primary", 100)};
  }
  &:disabled {
    color: ${color("gray", 500)};
    border: 1px solid ${color("gray", 300)};
    background: ${color("gray", 50)};
  }

  ${(props) => {
    if (props.error) {
      return css`
        border: 1px solid ${color("error", 300)};
        &:focus {
          box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05),
            0px 0px 0px 4px ${color("error", 100)};
        }
      `;
    }
  }}
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
      <InputField
        type="text"
        placeholder={placeholder}
        error={error}
        disabled={disabled}
      />
      <Hint error={error}>{error ? errorMessage : hint}</Hint>
    </Container>
  );
}
