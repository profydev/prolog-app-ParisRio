import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Button, ButtonSize, ButtonColor, ButtonState } from "./button";

export default {
  title: "UI/Button",
  component: Button,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = ({ size, color, state }) => (
  <div style={{ padding: 50 }}>
    <Button color={color} size={size} state={state}>
      Button CTA
    </Button>
  </div>
);

export const Default = Template.bind({});
Default.args = {
  size: ButtonSize.sm,
  color: ButtonColor.primary,
  state: ButtonState.default,
};
Default.parameters = {
  viewMode: "docs",
};
