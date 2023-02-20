import styled from "styled-components";

const Container = styled.div`
  width: fit-content;
  display: flex;
  flex-direction: column;
`;

const Label = styled.label``;

const SelectInput = styled.select`
  -moz-appearance: none;
  -webkit-appearance: none;
`;

const Option = styled.option`
  -moz-appearance: none;
  -webkit-appearance: none;
`;

const Hint = styled.span``;

export function Select() {
  return (
    <Container>
      <Label>My input</Label>
      <SelectInput>
        <Option>option1</Option>
        <Option>option2</Option>
      </SelectInput>
      <Hint>Do this</Hint>
    </Container>
  );
}
