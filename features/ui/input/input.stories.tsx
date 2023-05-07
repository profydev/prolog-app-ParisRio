import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Input } from "./input";

export default {
  title: "UI/Input",
  component: Input,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = ({
  type,
  placeholder,
  label,
  leadingIconSrc,
  hint,
  error,
  errorMessage,
  errorIconSrc,
  disabled,
}) => (
  <div
    style={{
      paddingTop: 50,
      paddingRight: 50,
      paddingLeft: 50,
      paddingBottom: 50,
    }}
  >
    <Input
      type={type}
      label={label}
      hint={hint}
      error={error}
      errorMessage={errorMessage}
      placeholder={placeholder}
      disabled={disabled}
      leadingIconSrc={leadingIconSrc}
      errorIconSrc={errorIconSrc}
    />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  type: "password",
  disabled: false,
  placeholder: "olivia@untitledui.com",
  label: "Email",
  leadingIconSrc: "/icons/email.svg",
  hint: "This is a hint text to help user.",
  error: false,
  errorMessage: "This is a error message.",
  errorIconSrc: "/icons/alert-circle.svg",
};
Default.parameters = {
  viewMode: "docs",
};
