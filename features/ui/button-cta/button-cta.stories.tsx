import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ButtonCTA, ButtonCtaSize, ButtonCtaColor } from "./button-cta";

export default {
  title: "UI/Button",
  component: ButtonCTA,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} as ComponentMeta<typeof ButtonCTA>;

const Template: ComponentStory<typeof ButtonCTA> = ({ size, color }) => (
  <div style={{ padding: 50 }}>
    <ButtonCTA color={color} size={size}>
      Button CTA
    </ButtonCTA>
  </div>
);

export const Default = Template.bind({});
Default.args = {
  size: ButtonCtaSize.sm,
  color: ButtonCtaColor.primary,
};
Default.parameters = {
  viewMode: "docs",
};
