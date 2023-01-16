import { color } from "@styles/theme";
import styled, { keyframes } from "styled-components";

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Container = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  animation: ${rotate} 2s linear infinite;
`;

const ExteriorCircle = styled.div`
  height: 64px;
  width: 64px;
  background-color: ${color("primary", 50)};
  border-radius: 50%;
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
`;

const QuarterCircle = styled.div`
  height: 32px;
  width: 32px;
  background-color: ${color("primary", 600)};
  border-radius: 0 32px 0 0;
  top: 0;
  right: 0;
  position: absolute;
  z-index: 3;
`;
const QuarterCircleEndTop = styled.div`
  height: 6px;
  width: 6px;
  background-color: ${color("primary", 600)};
  border-radius: 6px;
  top: 0;
  position: absolute;
  z-index: 3;
`;
const QuarterCircleEndBottom = styled.div`
  height: 6px;
  width: 6px;
  background-color: ${color("primary", 600)};
  border-radius: 6px;
  right: 0;
  position: absolute;
  z-index: 3;
`;

const InteriorCircle = styled.div`
  height: 52px;
  width: 52px;
  background-color: white;
  border-radius: 50%;
  position: absolute;
  z-index: 4;
`;

export function LoadingIndicator() {
  return (
    <Container id="loadingIndicator">
      <ExteriorCircle>
        <QuarterCircle />
        <QuarterCircleEndTop />
        <QuarterCircleEndBottom />
        <InteriorCircle />
      </ExteriorCircle>
    </Container>
  );
}
