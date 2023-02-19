import { color, space, textFont } from "@styles/theme";
import { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";

export enum CheckboxSize {
  sm = "sm",
  md = "md",
}

//CheckBoxSize named is used in order not to conflict with <inpute> size attribute.
type CheckboxProps = {
  children: React.ReactNode;
  checkboxSize?: CheckboxSize;
  checked?: boolean;
  disabled?: boolean;
  indeterminate?: boolean;
};

const Container = styled.div`
  // remove default checkbox styles
  border: none;
  margin: 0;
  padding: 0;
  background: transparent;
  line-height: normal;
  -webkit-font-smoothing: inherit;
  -moz-osx-font-smoothing: inherit;
  -webkit-appearance: none;

  &::-moz-focus-inner {
    border: 0;
    padding: 0;
  }

  //comon style
  box-sizing: border-box;
  display: flex;
  align-items: center;
`;

const Input = styled.input<{
  checkboxSize: CheckboxSize;
  indeterminate: boolean;
}>`
  -moz-appearance: none;
  -webkit-appearance: none;
  box-sizing: border-box;
  border: 1px solid ${color("gray", 300)};
  background-color: white;
  background-repeat: no-repeat;
  background-position: center;
  &:hover {
    border: 1px solid ${color("primary", 600)};
    background-color: ${color("primary", 50)};
  }
  &:focus {
    border: 1px solid ${color("primary", 300)};
    background-color: white;
    box-shadow: 0px 0px 0px 4px ${color("primary", 100)};
  }
  &:disabled {
    border: 1px solid ${color("gray", 200)};
    background-color: ${color("gray", 100)};
  }

  ${(props) => {
    switch (props.checkboxSize) {
      case CheckboxSize.sm:
        return css`
          width: ${space(4)};
          height: ${space(4)};
          border-radius: ${space(1)};
          &:checked {
            background-image: url("/icons/checkbox-checked-sm.svg");
            border: 1px solid ${color("primary", 600)};
            background-color: ${color("primary", 50)};
          }
          &:indeterminate {
            background-image: url("/icons/checkbox-indeterminated-sm.svg");
            border: 1px solid ${color("primary", 600)};
            background-color: ${color("primary", 50)};
          }
          &:checked:disabled {
            background-image: url("/icons/checkbox-checked-sm-disabled.svg");
            border: 1px solid ${color("gray", 200)};
            background-color: ${color("gray", 100)};
          }
          &:indeterminate:disabled {
            background-image: url("/icons/checkbox-indeterminated-sm-disabled.svg");
            border: 1px solid ${color("gray", 200)};
            background-color: ${color("gray", 100)};
          }
        `;
      case CheckboxSize.md:
        return css`
          width: ${space(5)};
          height: ${space(5)};
          border-radius: 0.375rem;
          &:checked {
            background-image: url("/icons/checkbox-checked.svg");
            border: 1px solid ${color("primary", 600)};
            background-color: ${color("primary", 50)};
          }
          &:indeterminate {
            background-image: url("/icons/checkbox-indeterminated.svg");
            border: 1px solid ${color("primary", 600)};
            background-color: ${color("primary", 50)};
          }
          &:checked:disabled {
            background-image: url("/icons/checkbox-checked-disabled.svg");
            border: 1px solid ${color("gray", 200)};
            background-color: ${color("gray", 100)};
          }
          &:indeterminate:disabled {
            background-image: url("/icons/checkbox-indeterminated-disabled.svg");
            border: 1px solid ${color("gray", 200)};
            background-color: ${color("gray", 100)};
          }
        `;
    }
  }}
`;

const Label = styled.label<{ checkboxSize: CheckboxSize; disabled: boolean }>`
  color: ${color("gray", 700)};
  box-sizing: border-box;
  //size
  ${(props) => {
    switch (props.checkboxSize) {
      case CheckboxSize.sm:
        return css`
          padding-left: ${space(2)};
          padding-top: 1px;
          height: 20px;
          ${textFont("sm", "medium")};
        `;
      case CheckboxSize.md:
        return css`
          padding-left: ${space(3)};
          padding-top: 1px;
          height: 24px;
          ${textFont("md", "medium")};
        `;
    }
  }}
  ${(props) => {
    if (props.disabled) {
      return css`
        color: ${color("gray", 300)};
      `;
    }
  }}
`;

export function Checkbox({
  children,
  checkboxSize = CheckboxSize.md,
  checked = false,
  disabled = false,
  indeterminate = false,
}: CheckboxProps) {
  const [checkboxStatus, setCheckboxStatus] = useState(checked);

  //Indeterminate can only be accessed through the DOM element (HTMLInputElement) of the checkbox,
  //UseRef is used for this purpose.
  const checkboxRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate = indeterminate;
    }
  }, [checkboxRef, indeterminate]);

  function handleChange() {
    setCheckboxStatus((previous) => !previous);
  }

  return (
    <Container>
      <Input
        type="checkbox"
        ref={checkboxRef}
        checkboxSize={checkboxSize}
        checked={checkboxStatus}
        onChange={handleChange}
        disabled={disabled}
        indeterminate={indeterminate}
      />
      <Label checkboxSize={checkboxSize} disabled={disabled}>
        {children}
      </Label>
    </Container>
  );
}
