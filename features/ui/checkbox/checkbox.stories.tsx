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

const Template: ComponentStory<typeof Checkbox> = ({
  checked,
  checkboxSize,
  disabled,
  indeterminate,
}) => (
  <div style={{ padding: 50 }}>
    <Checkbox
      checked={checked}
      checkboxSize={checkboxSize}
      disabled={disabled}
      indeterminate={indeterminate}
    >
      Label
    </Checkbox>
  </div>
);

export const Default = Template.bind({});
Default.args = {
  checkboxSize: CheckboxSize.md,
  checked: false,
  disabled: false,
  indeterminate: false,
};
Default.parameters = {
  viewMode: "docs",
};
