import * as React from "react";

export function useMediaQuery(query) {
  const [matches, setMatches] = React.useState(() => {
    if (typeof window === "undefined") return false;

    return window.matchMedia(query).matches;
  });

  React.useEffect(() => {
    const mediaQuery = window.matchMedia(query);

    const handleChange = () => {
      setMatches(mediaQuery.matches);
    };

    handleChange();

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [query]);

  return matches;
}