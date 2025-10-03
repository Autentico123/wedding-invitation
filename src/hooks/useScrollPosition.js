import { useState, useEffect } from "react";

/**
 * Custom hook to track scroll position
 * Returns current scroll position and scroll direction
 */
export const useScrollPosition = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollDirection, setScrollDirection] = useState("up");

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const updateScrollPosition = () => {
      const currentScrollY = window.scrollY;
      const direction = currentScrollY > lastScrollY ? "down" : "up";

      setScrollPosition(currentScrollY);
      setScrollDirection(direction);
      lastScrollY = currentScrollY > 0 ? currentScrollY : 0;
    };

    const throttledUpdateScrollPosition = throttle(updateScrollPosition, 16);

    window.addEventListener("scroll", throttledUpdateScrollPosition, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", throttledUpdateScrollPosition);
    };
  }, []);

  return { scrollPosition, scrollDirection };
};

/**
 * Throttle function to limit function calls
 */
const throttle = (func, limit) => {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};
