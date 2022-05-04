import { useState, useEffect, useCallback, useRef } from "react";

const useInfiniteScroll = (targetEl) => {
  const observeRef = useRef(null);
  const [intersecting, setIntersecting] = useState(false);

  const getObserver = useCallback(() => {
    if (!observeRef.current) {
      observeRef.current = new IntersectionObserver((entries) =>
        setIntersecting(entries.some((entry) => entry.isIntersecting)),
      );
    }
    return observeRef.current;
  }, [observeRef.current]);

  useEffect(() => {
    if (targetEl.current) getObserver().observe(targetEl.current);
    return () => {
      getObserver().disconnect();
    };
  }, [targetEl.current]);

  return intersecting;
};

export default useInfiniteScroll;
