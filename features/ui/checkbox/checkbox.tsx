import { color, space, textFont } from "@styles/theme";
import styled, { css } from "styled-components";

export enum CheckboxSize {
  sm = "sm",
  md = "md",
}

type CheckboxProps = {
  children: React.ReactNode;
  size?: CheckboxSize;
  disabled: boolean;
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

const Input = styled.input<{ CheckBoxSize: CheckboxSize }>`
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
    stroke: ${color("gray", 200)};
  }

  ${(props) => {
    switch (props.CheckBoxSize) {
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
            background-image: url("/icons/checkbox-checked-sm.svg");
            border: 1px solid ${color("gray", 200)};
            background-color: ${color("gray", 100)};
            stroke: ${color("gray", 200)};
          }
          &:indeterminate:disabled {
            background-image: url("/icons/checkbox-indeterminated-sm.svg");
            border: 1px solid ${color("gray", 200)};
            background-color: ${color("gray", 100)};
            stroke: ${color("gray", 200)};
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
            background-image: url("/icons/checkbox-checked.svg");
            border: 1px solid ${color("gray", 200)};
            background-color: ${color("gray", 100)};
            stroke: ${color("gray", 200)};
          }
          &:indeterminate:disabled {
            background-image: url("/icons/checkbox-indeterminated.svg");
            border: 1px solid ${color("gray", 200)};
            background-color: ${color("gray", 100)};
            stroke: ${color("gray", 200)};
          }
        `;
    }
  }}
`;

const Label = styled.label<{ CheckBoxSize: CheckboxSize; disabled: boolean }>`
  color: ${color("gray", 700)};
  box-sizing: border-box;
  //size
  ${(props) => {
    switch (props.CheckBoxSize) {
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
  size = CheckboxSize.md,
  disabled = false,
}: CheckboxProps) {
  return (
    <Container>
      <Input CheckBoxSize={size} type="checkbox" disabled={disabled} checked />
      <Label CheckBoxSize={size} disabled={disabled}>
        {children}
      </Label>
    </Container>
  );
}
