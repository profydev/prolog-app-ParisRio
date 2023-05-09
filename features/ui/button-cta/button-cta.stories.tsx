import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import {
  ButtonCTA,
  ButtonCtaSize,
  ButtonCtaColorType,
  ButtonCtaIconPosition,
} from "./button-cta";

export default {
  title: "UI/Button",
  component: ButtonCTA,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} as ComponentMeta<typeof ButtonCTA>;

const Template: ComponentStory<typeof ButtonCTA> = ({
  size,
  ButtonCtaColor,
  iconSrc,
  iconPosition,
  disabled,
}) => (
  <div style={{ padding: 50 }}>
    <ButtonCTA
      ButtonCtaColor={ButtonCtaColor}
      size={size}
      iconSrc={iconSrc}
      iconPosition={iconPosition}
      disabled={disabled}
    >
      Button CTA
    </ButtonCTA>
  </div>
);

export const Default = Template.bind({});
Default.args = {
  size: ButtonCtaSize.sm,
  ButtonCtaColor: ButtonCtaColorType.primary,
  iconSrc: "/icons/projects.svg",
  iconPosition: ButtonCtaIconPosition.leading,
  disabled: false,
};
Default.parameters = {
  viewMode: "docs",
};
