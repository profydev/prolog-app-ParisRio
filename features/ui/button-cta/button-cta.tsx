import { color, space, textFont } from "@styles/theme";
import React from "react";
import styled, { css } from "styled-components";

export enum ButtonCtaSize {
  sm = "sm",
  md = "md",
  lg = "lg",
  xl = "xl",
}

export enum ButtonCtaColor {
  primary = "primary",
  secondary = "secondary",
  gray = "gray",
  empty = "empty",
  emptyGray = "emptyGray",
  error = "error",
}

export enum ButtonCtaIconPosition {
  leading = "leading",
  trailing = "trailing",
  iconOnly = "iconOnly",
}

type ButtonProps = {
  children?: React.ReactNode;
  size?: ButtonCtaSize;
  color?: ButtonCtaColor;
  iconSrc?: string;
  iconPosition?: ButtonCtaIconPosition;
  disabled?: boolean;
};

export const Container = styled.button<{
  size: ButtonCtaSize;
  color: ButtonCtaColor;
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
  box-sizing: border-box;
  display: flex;
  align-items: center;
  border-radius: ${space(2)};

  //size
  ${(props) => {
    switch (props.size) {
      case ButtonCtaSize.sm:
        return css`
          padding: 0.5rem 0.875rem;
          height: 2.25rem;
          ${textFont("sm", "medium")}
        `;
      case ButtonCtaSize.md:
        return css`
          padding: 0.625rem 1rem;
          height: 2.5rem;
          ${textFont("sm", "medium")}
        `;
      case ButtonCtaSize.lg:
        return css`
          padding: 0.625rem 1.125rem;
          height: 2.75rem;
          ${textFont("md", "medium")}
        `;
      case ButtonCtaSize.xl:
        return css`
          padding: 0.75rem 1.25rem;
          height: 3rem;
          ${textFont("md", "medium")}
        `;
    }
  }}

  //Color and state
  ${(props) => {
    //Primary
    if (props.color === ButtonCtaColor.primary) {
      return css`
        color: white;
        background: ${color("primary", 600)};
        border: 1px solid ${color("primary", 600)};
        box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
        &:hover {
          background: ${color("primary", 700)};
          border: 1px solid ${color("primary", 700)};
        }
        &:focus {
          background: ${color("primary", 600)};
          border: 1px solid ${color("primary", 600)};
          box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05),
            0px 0px 0px 4px ${color("primary", 100)};
        }
        &:disabled {
          background: ${color("primary", 200)};
          border: 1px solid ${color("primary", 200)};
        }
      `;
    }

    //Secondary
    else if (props.color === ButtonCtaColor.secondary) {
      return css`
        background: ${color("primary", 50)};
        color: ${color("primary", 700)};
        border: 1px solid ${color("primary", 50)};
        box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
        &:hover {
          background: ${color("primary", 100)};
          border: 1px solid ${color("primary", 100)};
        }
        &:focus {
          background: ${color("primary", 50)};
          border: 1px solid ${color("primary", 50)};
          box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05),
            0px 0px 0px 4px ${color("primary", 100)};
        }
        &:disabled {
          background: ${color("primary", 25)};
          color: ${color("primary", 300)};
          border: 1px solid ${color("primary", 25)};
        }
      `;
    }

    //Gray
    else if (props.color === ButtonCtaColor.gray) {
      return css`
        background: white;
        color: ${color("gray", 700)};
        border: 1px solid ${color("gray", 300)};
        box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
        &:hover {
          background: ${color("gray", 50)};
          color: ${color("gray", 800)};
        }
        &:focus {
          background: white;
          color: ${color("gray", 700)};
          box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05),
            0px 0px 0px 4px ${color("gray", 100)};
        }
        &:disabled {
          color: ${color("gray", 300)};
          border: 1px solid ${color("gray", 200)};
        }
      `;
    }

    //Empty
    else if (props.color === ButtonCtaColor.empty) {
      return css`
        color: ${color("primary", 700)};
        &:hover {
          background: ${color("primary", 50)};
        }
        :focus {
          color: ${color("primary", 700)};
          background: unset;
        }
        &:disabled {
          color: ${color("gray", 300)};
        }
      `;
    }

    //Empty gray
    else if (props.color === ButtonCtaColor.emptyGray) {
      return css`
        color: ${color("gray", 500)};
        &:hover {
          background: ${color("gray", 50)};
          color: ${color("gray", 600)};
        }
        :focus {
          color: ${color("gray", 500)};
          background: unset;
        }
        &:disabled {
          color: ${color("gray", 300)};
        }
      `;
    }

    //Error
    else if (props.color === ButtonCtaColor.error) {
      return css`
        background: ${color("error", 600)};
        color: white;
        border: 1px solid ${color("error", 600)};
        box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
        &:hover {
          background: ${color("error", 700)};
          border: 1px solid ${color("error", 700)};
        }
        &:focus {
          background: ${color("error", 600)};
          border: 1px solid ${color("error", 600)};
          box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05),
            0px 0px 0px 4px ${color("error", 100)};
        }
        &:disabled {
          background: ${color("error", 200)};
          border: 1px solid ${color("error", 200)};
        }
      `;
    }
  }}
`;

export const Icon = styled.img<{
  iconPosition: ButtonCtaIconPosition;
}>`
  width: ${space(4)};
  ${(props) => {
    if (props.iconPosition === ButtonCtaIconPosition.leading) {
      return css`
        padding-right: ${space(2)};
      `;
    } else if (props.iconPosition === ButtonCtaIconPosition.trailing) {
      return css`
        padding-left: ${space(2)};
        order: 1;
      `;
    }
  }}
`;

export function ButtonCTA({
  children,
  size = ButtonCtaSize.md,
  color = ButtonCtaColor.primary,
  iconSrc,
  iconPosition = ButtonCtaIconPosition.leading,
  disabled = false,
}: ButtonProps) {
  //First case is for Button CTA with only icon and no Text.
  //Then Case for Button CTA with leading or trailing icon + Text
  //Case for Button CTA with only text (no icon src provided)

  return (
    <Container as="button" size={size} color={color} disabled={disabled}>
      {iconSrc && iconPosition === ButtonCtaIconPosition.iconOnly ? (
        <Icon src={iconSrc} alt={`icon`} iconPosition={iconPosition} />
      ) : (
        <>
          {iconSrc && (
            <Icon src={iconSrc} alt={`icon`} iconPosition={iconPosition} />
          )}
          {children}
        </>
      )}
    </Container>
  );
}
