import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Checkbox, CheckboxSize } from "./checkbox";

export default {
  title: "UI/Checkbox",
  component: Checkbox,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} as ComponentMeta<typeof Checkbox>;

const Template: ComponentStory<typeof Checkbox> = ({ size, disabled }) => (
  <div style={{ padding: 50 }}>
    <Checkbox size={size} disabled={disabled}>
      Label
    </Checkbox>
  </div>
);

export const Default = Template.bind({});
Default.args = {
  size: CheckboxSize.md,
  disabled: false,
};
Default.parameters = {
  viewMode: "docs",
};
