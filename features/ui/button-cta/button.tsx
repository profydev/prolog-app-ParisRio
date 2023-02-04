import { color, space, textFont } from "@styles/theme";
import React from "react";
import styled, { css } from "styled-components";

export enum ButtonSize {
  sm = "sm",
  md = "md",
  lg = "lg",
  xl = "xl",
}

export enum ButtonColor {
  primary = "primary",
  secondary = "secondary",
  gray = "gray",
  empty = "empty",
  emptyGray = "emptyGray",
  error = "error",
}

export enum ButtonState {
  default = "default",
  hover = "hover",
  focused = "focused",
  disabled = "disabled",
}

type ButtonProps = {
  children: React.ReactNode;
  size?: ButtonSize;
  color?: ButtonColor;
  state?: ButtonState;
};

export const Container = styled.button<{
  size: ButtonSize;
  color: ButtonColor;
  state: ButtonState;
}>`
  cursor: pointer;

  // remove default button styles
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
  width: fit-content;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  border-radius: ${space(2)};

  //size
  ${(props) => {
    switch (props.size) {
      case ButtonSize.sm:
        return css`
          padding: 0.5rem 0.875rem;
          height: 2.25rem;
          ${textFont("sm", "medium")}
        `;
      case ButtonSize.md:
        return css`
          padding: 0.625rem 1rem;
          height: 2.5rem;
          ${textFont("sm", "medium")}
        `;
      case ButtonSize.lg:
        return css`
          padding: 0.625rem 1.125rem;
          height: 2.75rem;
          ${textFont("md", "medium")}
        `;
      case ButtonSize.xl:
        return css`
          padding: 0.75rem 1.25rem;
          height: 3rem;
          ${textFont("md", "medium")}
        `;
    }
  }}
  ${(props) => {
    if (
      props.color === ButtonColor.primary &&
      props.state === ButtonState.default
    ) {
      return css`
        background: ${color("primary", 600)};
        color: white;
        border: 1px solid ${color("primary", 600)};
        box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
      `;
    } else if (
      props.color === ButtonColor.primary &&
      props.state === ButtonState.hover
    ) {
      return css`
        background: ${color("primary", 600)};
        color: white;
        border: 1px solid ${color("primary", 600)};
        box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
      `;
    } else if (
      props.color === ButtonColor.primary &&
      props.state === ButtonState.focused
    ) {
      return css`
        background: ${color("primary", 600)};
        color: white;
        border: 1px solid ${color("primary", 600)};
        box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05),
          0px 0px 0px 4px ${color("primary", 100)};
      `;
    } else if (
      props.color === ButtonColor.primary &&
      props.state === ButtonState.disabled
    ) {
      return css`
        background: ${color("primary", 200)};
        color: white;
        border: 1px solid ${color("primary", 200)};
        box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
      `;
    }
  }}
`;

export function Button({
  children,
  size = ButtonSize.md,
  color = ButtonColor.primary,
  state = ButtonState.default,
}: ButtonProps) {
  return (
    <Container size={size} color={color} state={state}>
      {children}
    </Container>
  );
}
