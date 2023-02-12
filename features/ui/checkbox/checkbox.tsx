import { color, space, textFont } from "@styles/theme";
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
  align-items: center;
`;

const Input = styled.input<{ CheckBoxSize: CheckboxSize }>`
  -moz-appearance: none;
  -webkit-appearance: none;
  box-sizing: border-box;
  border: 1px solid ${color("gray", 300)};
  background-color: white;
  ${(props) => {
    switch (props.CheckBoxSize) {
      case CheckboxSize.sm:
        return css`
          width: ${space(4)};
          height: ${space(4)};
          border-radius: ${space(1)};
        `;
      case CheckboxSize.md:
        return css`
          width: ${space(5)};
          height: ${space(5)};
          border-radius: 0.375rem;
        `;
    }
  }}
`;

const Label = styled.label<{ CheckBoxSize: CheckboxSize }>`
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
`;

export function Checkbox({ children, size = CheckboxSize.md }: CheckboxProps) {
  return (
    <Container>
      <Input CheckBoxSize={size} type="checkbox" />
      <Label CheckBoxSize={size}>{children}</Label>
    </Container>
  );
}
