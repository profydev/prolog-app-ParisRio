import Link from "next/link";
import React from "react";
import styled from "styled-components";
import { color, space, textFont } from "@styles/theme";

type MenuItemProps = {
  text: string;
  href: string;
};

export const ListItem = styled.li`
  display: flex;
  align-items: center;
  padding: ${space(0, 3)};
  &:first-child {
    /* margin-top: 0; */
  }
`;

export const Anchor = styled.a`
  display: flex;
  align-items: center;
  color: ${color("gray", 500)};
  text-decoration: none;
  ${textFont("md", "medium")}
`;

export function MenuItemLink({ text, href }: MenuItemProps) {
  return (
    <ListItem>
      <Link href={href} passHref>
        <Anchor>{text}</Anchor>
      </Link>
    </ListItem>
  );
}
