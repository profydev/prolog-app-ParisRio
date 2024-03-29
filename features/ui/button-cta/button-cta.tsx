import { color, space, textFont } from "@styles/theme";
import React from "react";
import styled, { css } from "styled-components";

export enum ButtonCtaSize {
  sm = "sm",
  md = "md",
  lg = "lg",
  xl = "xl",
}

export enum ButtonCtaColorType {
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

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  /** The content to be displayed inside the button */
  children?: React.ReactNode;
  /**
   * The size of the button (e.g., "sm", "md", "lg", "xl").
   * Determines the font-size, padding, and overall dimensions.
   */
  size?: ButtonCtaSize;
  /**
   * The color of the button (e.g., "primary", "error",...).
   * Determines the background color and text color.
   */
  ButtonCtaColor?: ButtonCtaColorType;
  /** URL of the icon to display within the button */
  iconSrc?: string;
  /**
   * The position of the icon inside the button (e.g., "leading", "trailing", "iconOnly").
   * Determines whether the icon is displayed before or after the text, or if the button contains only an icon.
   */
  iconPosition?: ButtonCtaIconPosition;
  /** Disables the button when set to true */
  disabled?: boolean;
};

export const Container = styled.button<{
  size: ButtonCtaSize;
  ButtonCtaColor: ButtonCtaColorType;
}>`
  cursor: pointer;

  // remove default button styles
  all: unset;
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
    if (props.ButtonCtaColor === ButtonCtaColorType.primary) {
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
    else if (props.ButtonCtaColor === ButtonCtaColorType.secondary) {
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
    else if (props.ButtonCtaColor === ButtonCtaColorType.gray) {
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
    else if (props.ButtonCtaColor === ButtonCtaColorType.empty) {
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
    else if (props.ButtonCtaColor === ButtonCtaColorType.emptyGray) {
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
    else if (props.ButtonCtaColor === ButtonCtaColorType.error) {
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
  ButtonCtaColor = ButtonCtaColorType.primary,
  iconSrc,
  iconPosition = ButtonCtaIconPosition.leading,
  disabled = false,
  ...rest
}: ButtonProps) {
  //First case is for Button CTA with only icon and no Text.
  //Then Case for Button CTA with leading or trailing icon + Text
  //Case for Button CTA with only text (no icon src provided)

  return (
    <Container
      size={size}
      ButtonCtaColor={ButtonCtaColor}
      disabled={disabled}
      {...rest}
    >
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
