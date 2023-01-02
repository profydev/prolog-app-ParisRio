import { breakpoint, color, space, textFont } from "@styles/theme";
import styled, { css } from "styled-components";
import { MenuItemLink } from "./menu-item-link";
import PackageJson from "../../../package.json";

const footerLinkItems = [
  { text: "Docs", href: "/" },
  { text: "API", href: "/" },
  { text: "Help", href: "/" },
  { text: "Community", href: "/" },
];

const containerStyles = css`
  width: 100%;
  height: 3.75rem;
  display: flex;
  background-color: ${color("gray", 50)};
  justify-content: space-between;
  align-items: center;
  @media (min-width: ${breakpoint("desktop")}) {
  }
`;

const Container = styled.div`
  ${containerStyles}
`;

const Version = styled.div`
  color: ${color("gray", 400)};
  margin-left: ${space(8)};
  ${textFont("md", "regular")};
`;

const Nav = styled.nav``;
const LinkList = styled.ul`
  display: flex;
`;
const Logo = styled.img`
  margin-right: ${space(8)};
`;

export function Footer() {
  return (
    <Container>
      <Version>Version: {PackageJson.version}</Version>
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
