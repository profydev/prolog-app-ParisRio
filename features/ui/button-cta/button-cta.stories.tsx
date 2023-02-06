import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import {
  ButtonCTA,
  ButtonCtaSize,
  ButtonCtaColor,
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
//iconSrc={iconSrc}
const Template: ComponentStory<typeof ButtonCTA> = ({
  size,
  color,
  iconSrc,
  iconPosition,
}) => (
  <div style={{ padding: 50 }}>
    <ButtonCTA
      color={color}
      size={size}
      iconSrc={iconSrc}
      iconPosition={iconPosition}
    >
      Test
    </ButtonCTA>
  </div>
);

export const Default = Template.bind({});
Default.args = {
  size: ButtonCtaSize.sm,
  color: ButtonCtaColor.primary,
  iconSrc: "/icons/projects.svg",
  iconPosition: ButtonCtaIconPosition.leading,
};
Default.parameters = {
  viewMode: "docs",
};
