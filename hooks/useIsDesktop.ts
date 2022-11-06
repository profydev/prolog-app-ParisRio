import { useWindowWith } from "./useWindowWidth";

export function useIsDesktop(desktopWidth: number): boolean {
  const windowWidth = useWindowWith();
  if (windowWidth.width && windowWidth.width >= desktopWidth) {
    return true;
  } else {
    return false;
  }
}
