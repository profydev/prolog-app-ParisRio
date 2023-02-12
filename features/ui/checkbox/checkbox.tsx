import { textFont } from "@styles/theme";
import { InputHTMLAttributes } from "react";
import styled, { css } from "styled-components";

export enum CheckboxSize {
  sm = "sm",
  md = "md",
}

type CheckboxProps = {
  children: React.ReactNode;
  size?: CheckboxSize;
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
`;
const Input = styled.input<{ CheckBoxSize: CheckboxSize }>`
  ${(props) => {
    switch (props.CheckBoxSize) {
      case CheckboxSize.sm:
        return css`
          ${textFont("sm", "medium")}
        `;
      case CheckboxSize.md:
        return css`
          ${textFont("md", "medium")}
        `;
    }
  }}
`;

const Label = styled.label<{ CheckBoxSize: CheckboxSize }>`
  //size
  ${(props) => {
    switch (props.CheckBoxSize) {
      case CheckboxSize.sm:
        return css`
          ${textFont("sm", "medium")}
        `;
      case CheckboxSize.md:
        return css`
          ${textFont("md", "medium")}
        `;
    }
  }}
`;

export function Checkbox({ children, size = CheckboxSize.md }: CheckboxProps) {
  return (
    <Container>
      <Input CheckBoxSize={size} type="checkbox" />
      <Label CheckBoxSize={size}>{children}</Label>
    </Container>
  );
}
