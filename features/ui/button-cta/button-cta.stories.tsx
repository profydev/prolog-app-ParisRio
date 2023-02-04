import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import {
  ButtonCTA,
  ButtonCtaSize,
  ButtonCtaColor,
  ButtonCtaState,
} from "./button-cta";

export default {
  title: "UI/Button",
  component: ButtonCTA,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} as ComponentMeta<typeof ButtonCTA>;

const Template: ComponentStory<typeof ButtonCTA> = ({ size, color, state }) => (
  <div style={{ padding: 50 }}>
    <ButtonCTA color={color} size={size} state={state}>
      Button CTA
    </ButtonCTA>
  </div>
);

export const Default = Template.bind({});
Default.args = {
  size: ButtonCtaSize.sm,
  color: ButtonCtaColor.primary,
  state: ButtonCtaState.default,
};
Default.parameters = {
  viewMode: "docs",
};
