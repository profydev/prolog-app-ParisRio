import Link from "next/link";
import styled from "styled-components";
import { Routes } from "@config/routes";
import { color, space, textFont } from "@styles/theme";
import { ButtonCTA, ButtonCtaSize } from "@features/ui";

const Header = styled.header`
  width: 100%;
  height: 80px;
  padding: 0 7rem;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
`;
const ItemContainer = styled.div`
  display: flex;
`;
const Item = styled.div`
  /* margin-bottom: ${space(4)}; */
  padding: ${space(4)};
  color: ${color("gray", 500)};
  ${textFont("md", "medium")}
`;
const DashBoardAnchor = styled.a`
  text-decoration: none;
  color: unset;
  /* ${textFont("sm", "medium")} */
`;

const ContactButton = styled.button`
  position: absolute;
  bottom: 2.5rem;
  right: 2.5rem;
  padding: 1rem;
  background: #7f56d9;
  border-radius: 50%;
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
  border: none;
  cursor: pointer;

  &:hover {
    background: #6941c6;
  }
`;

const IssuesPage = () => {
  return (
    <div>
      <Header>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/icons/logo-large.svg" alt="Prolog logo" />
        <ItemContainer>
          <Item>
            <Link href={Routes.home} passHref>
              <DashBoardAnchor>Home</DashBoardAnchor>
            </Link>
          </Item>
          <Item>
            <Link href="/products" passHref>
              <DashBoardAnchor>Products</DashBoardAnchor>
            </Link>
          </Item>
          <Item>
            <Link href="/documentation" passHref>
              <DashBoardAnchor>Documentation</DashBoardAnchor>
            </Link>
          </Item>
          <Item>
            <Link href="/pricing" passHref>
              <DashBoardAnchor>Pricing</DashBoardAnchor>
            </Link>
          </Item>
        </ItemContainer>
        <ButtonCTA size={ButtonCtaSize.lg}>
          <Link href={Routes.projects} passHref>
            <DashBoardAnchor>Open Dashboard</DashBoardAnchor>
          </Link>
        </ButtonCTA>
      </Header>
      <ContactButton
        onClick={() =>
          alert(
            "Implement this in Challenge 2 - Modal:\n\nhttps://profy.dev/rjs-challenge-modal"
          )
        }
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/icons/message.svg" alt="Contact" />
      </ContactButton>
    </div>
  );
};

export default IssuesPage;
