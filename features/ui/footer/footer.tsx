import styled, { css } from "styled-components";

const containerStyles = css`
  width: 100%;
  display: flex;
`;

const Container = styled.div`
  ${containerStyles}
`;

export function Footer() {
  return <Container>Hello world</Container>;
}
