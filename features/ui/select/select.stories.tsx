import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { SelectUI } from "./selectUI";
import styled from "styled-components";

const Container = styled.div`
  width: 320px;
`;

export default {
  title: "UI/Select",
  component: SelectUI,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} as ComponentMeta<typeof SelectUI>;

const Template: ComponentStory<typeof SelectUI> = ({
  placeholder,
  label,
  hint,
  error,
  errorMessage,
  iconSrc,
  disabled,
}) => (
  <div
    style={{
      paddingTop: 50,
      paddingRight: 50,
      paddingLeft: 50,
      paddingBottom: 200,
    }}
  >
    <Container>
      <SelectUI
        options={[
          { value: "Olivia Rhye", label: "Olivia Rhye" },
          { value: "Lena Stue", label: "Lena Stue" },
          { value: "John", label: "John" },
        ]}
        label={label}
        hint={hint}
        error={error}
        errorMessage={errorMessage}
        placeholder={placeholder}
        disabled={disabled}
        iconSrc={iconSrc}
      />
    </Container>
  </div>
);

export const Default = Template.bind({});
Default.args = {
  disabled: false,
  placeholder: "Select team member",
  label: "Team member",
  hint: "This is a hint text to help user.",
  error: false,
  errorMessage: "This is a error message.",
  iconSrc: "/icons/select-icon.svg",
};
Default.parameters = {
  viewMode: "docs",
};
