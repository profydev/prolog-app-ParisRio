import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { SelectUI } from "./selectUI";

export default {
  title: "UI/Select",
  component: SelectUI,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} as ComponentMeta<typeof SelectUI>;

const Template: ComponentStory<typeof SelectUI> = () => (
  <div style={{ padding: 50 }}>
    <SelectUI
      options={[
        { value: "Olivia Rhye", label: "Olivia Rhye" },
        { value: "Lena Stue", label: "Lena Stue" },
        { value: "John", label: "John" },
      ]}
      label="Alerts"
      hint="hint"
      placeholder="Select team member"
    />
  </div>
);

export const Default = Template.bind({});
Default.args = {};
Default.parameters = {
  viewMode: "docs",
};
