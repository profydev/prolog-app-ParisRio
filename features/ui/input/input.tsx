import { textFont, color } from "@styles/theme";
import styled, { css } from "styled-components";

//nvm use default 16.14.2

type InputProps = {
  placeholder?: string;
  label?: string;
  leadingIconSrc?: string;
  hint?: string;
  error?: boolean;
  errorMessage?: string;
  errorIconSrc?: string;
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
//Input field is wrapped inside a div to accomodate the leading icon and trailing error icon.
//Both these icons are added above the input field with 'absolute' css rules.
const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const LeadingIcon = styled.img`
  position: absolute;
  width: 1.25rem;
  left: 1rem;
`;

const ErrorIcon = styled.img`
  position: absolute;
  width: 1rem;
  right: 1rem;
`;

const InputField = styled.input<{
  error: boolean | undefined;
  leadingIconSrc: string | undefined;
}>`
  //Remove input basic style
  all: unset;
  min-width: 320px;
  height: 44px;

  //It is needed to adapt the padding inside the input with leading and error icon width.
  //Passed as props inside the input component
  padding-left: ${({ leadingIconSrc }) =>
    leadingIconSrc ? `2.75rem` : `0.875rem`};

  padding-right: ${({ error }) => (error ? `2.5rem` : `0.875rem`)};

  padding-top: 0.625rem;
  padding-bottom: 0.625rem;
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
  //Change styling if error mode is activated
  ${({ error }) => {
    if (error) {
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
  leadingIconSrc,
  hint,
  error,
  errorMessage,
  errorIconSrc,
  disabled,
}: InputProps) {
  return (
    <Container>
      <Label>{label}</Label>
      <InputWrapper>
        {leadingIconSrc && <LeadingIcon src={leadingIconSrc} alt={`icon`} />}
        {error && <ErrorIcon src={errorIconSrc} alt={`error-icon`} />}
        <InputField
          type="text"
          placeholder={placeholder}
          error={error}
          disabled={disabled}
          leadingIconSrc={leadingIconSrc}
        />
      </InputWrapper>
      <Hint error={error}>{error ? errorMessage : hint}</Hint>
    </Container>
  );
}
