"use client";

import { useEffect, useState } from "react";

export function useScrollThreshold(threshold: number) {
  const [passed, setPassed] = useState(false);

  useEffect(() => {
    let frame: number | null = null;

    const update = () => {
      frame = null;
      const next = window.scrollY > threshold;
      setPassed((current) => (current === next ? current : next));
    };

    const onScroll = () => {
      if (frame === null) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, [threshold]);

  return passed;
}
