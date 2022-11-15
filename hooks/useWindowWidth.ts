import { useEffect, useState } from "react";

//define general type for useWindowWith hook, which include width
interface Width {
  width: number | undefined;
}

//Hook
export function useWindowWith(): Width {
  //initialization with 'undefined'
  const [windowWidth, setWindowWidth] = useState<Width>({ width: undefined });

  useEffect(() => {
    function handleResize() {
      setWindowWidth({ width: window.innerWidth });
    }

    //add event listener for resize that will trigger handleResize
    window.addEventListener("resize", handleResize);

    //call handleResize to update state with initial window size
    handleResize();

    //remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return windowWidth;
}
