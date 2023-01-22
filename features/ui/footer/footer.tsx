import { breakpoint, color, space, textFont } from "@styles/theme";
import styled, { css } from "styled-components";
import { MenuItemLink } from "./menu-item-link";

const footerLinkItems = [
  { text: "Docs", href: "/" },
  { text: "API", href: "/" },
  { text: "Help", href: "/" },
  { text: "Community", href: "/" },
];

const containerStyles = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${color("gray", 50)};
  align-items: center;
  @media (min-width: ${breakpoint("desktop")}) {
    flex-direction: row;
    justify-content: space-between;
    height: 3.75rem;
  }
`;

const Container = styled.footer`
  ${containerStyles}
`;

const Version = styled.div`
  color: ${color("gray", 400)};
  ${textFont("md", "regular")};
  margin: ${space(0, 0, 6, 0)};
  order: 1;
  @media (min-width: ${breakpoint("desktop")}) {
    margin: ${space(0, 0, 0, 8)};
    order: 0;
  }
`;

const Nav = styled.nav``;

const LinkList = styled.ul`
  display: flex;
  margin: ${space(6, 0, 0, 0)};
  padding: ${space(0, 0, 0, 0)};
  @media (min-width: ${breakpoint("desktop")}) {
    margin: ${space(0, 0, 0, 0)};
  }
`;
const Logo = styled.img`
  margin: ${space(6, 0, 6, 0)};
  @media (min-width: ${breakpoint("desktop")}) {
    margin: ${space(0, 8, 0, 0)};
  }
`;

export function Footer() {
  return (
    <Container id="footer">
      <Version>Version: {process.env.version}</Version>
      <Nav>
        <LinkList>
          {footerLinkItems.map((footerItem, index) => (
            <MenuItemLink key={index} {...footerItem} />
          ))}
        </LinkList>
      </Nav>
      <Logo src="/icons/logo-small.svg" alt="logo" />
    </Container>
  );
}
