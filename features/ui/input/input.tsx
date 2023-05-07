import { textFont, color } from "@styles/theme";
import React from "react";
import styled, { css } from "styled-components";

//nvm use default 16.14.2

//Restrict allowed input type - Text type only
type AllowedInputTypes = "text" | "email" | "password" | "url" | "search";

//Global input component props.
type InputProps = {
  /**
   * The type of the input field. Determines the input behavior and validation.
   * Allowed types: "text", "email", "password", "url", "search".
   */
  type?: AllowedInputTypes;
  /** Placeholder text to display when the input is empty */
  placeholder?: string;
  /** Label text to display above the input field */
  label?: string;
  /** URL of the leading icon*/
  leadingIconSrc?: string;
  /** Hint text to display below the input field when there is no error */
  hint?: string;
  /** Enables error mode and related CSS rules */
  error?: boolean;
  /** Error message to display below the input field when there is an error */
  errorMessage?: string;
  /** URL of the trailing error icon*/
  errorIconSrc?: string;
  /** Disables the input field when set to true */
  disabled?: boolean;
};

//Input styled components props
//Includes the 'normal' input props and the components custom props.
type InputFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  /** Enables error mode and related CSS rules */
  error?: boolean;
  /** URL of the trailing error icon; adds padding on the right side to accommodate it */
  errorIconSrc?: string;
  /** URL of the leading icon; adds padding on the left side to accommodate it */
  leadingIconSrc?: string;
};

//Wrapper for the complete component
const Container = styled.div`
  width: fit-content;
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  ${textFont("sm", "medium")}
  color: ${color("gray", 700)};
`;
//Input field is wrapped inside a div to accomodate the optional leading icon and trailing error icon.
//Both these icons are added above the input field with 'absolute' css rule.
//right and left padding of the input field is modified to accomodate these icons.
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

const InputField = styled.input<InputFieldProps>`
  //Remove input basic style
  all: unset;
  min-width: 20rem;
  height: 2.75rem;
  //It is needed to adapt the padding inside the input when leading and error icons are provided.
  //Passed as props inside the input component
  padding-left: ${({ leadingIconSrc }) =>
    leadingIconSrc ? `2.75rem` : `0.875rem`};
  padding-right: ${({ error, errorIconSrc }) =>
    error && errorIconSrc ? `2.5rem` : `0.875rem`};
  padding-top: 0.625rem;
  padding-bottom: 0.625rem;
  margin: 0.375rem 0rem;
  background: #ffffff;
  ${textFont("md", "regular")};
  color: ${color("gray", 900)};
  border: 1px solid ${color("gray", 300)};
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
  border-radius: 0.5rem;
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
          border: 1px solid ${color("error", 300)};
          box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05),
            0px 0px 0px 4px ${color("error", 100)};
        }
        &:disabled {
          border: 1px solid ${color("error", 300)};
          background: #ffffff;
        }
      `;
    }
  }}
`;

const Hint = styled.span<{
  error?: boolean;
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
  type = "text", // Set the default value to "text"
  placeholder,
  label,
  leadingIconSrc,
  hint,
  error,
  errorMessage,
  errorIconSrc,
  disabled,
  ...rest
}: InputProps) {
  return (
    <Container>
      <Label>{label}</Label>
      <InputWrapper>
        {leadingIconSrc && <LeadingIcon src={leadingIconSrc} alt={`icon`} />}
        {error && errorIconSrc && (
          <ErrorIcon src={errorIconSrc} alt={`error-icon`} />
        )}
        <InputField
          type={type}
          placeholder={placeholder}
          error={error}
          errorIconSrc={errorIconSrc}
          disabled={disabled}
          leadingIconSrc={leadingIconSrc}
          {...rest}
        />
      </InputWrapper>
      <Hint error={error}>{error ? errorMessage : hint}</Hint>
    </Container>
  );
}
