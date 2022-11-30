import { breakpoint } from "@styles/theme";
import styled, { css } from "styled-components";
import { MenuItemLink } from "./menu-item-link";

const containerStyles = css`
  width: 100%;
  display: flex;
  background-color: grey;
  justify-content: center;
  align-items: center;
  @media (min-width: ${breakpoint("desktop")}) {
  }
`;

const Container = styled.div`
  ${containerStyles}
`;

const Version = styled.div``;

const Nav = styled.nav``;
const LinkList = styled.ul``;
const Logo = styled.img``;

export function Footer() {
  return (
    <Container>
      <Version>XXX</Version>
      <Nav>
        <LinkList>
          <MenuItemLink
            text="Docs"
            iconSrc="/icons/support.svg"
            href="mailto:support@prolog-app.com?subject=Support Request: "
            isActive={false}
            isCollapsed={false}
          />
        </LinkList>
      </Nav>
      <Logo src="/icons/logo-small.svg" alt="logo" />
    </Container>
  );
}
