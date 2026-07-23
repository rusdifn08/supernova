"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type ScrollSection = {
  id: string;
};

export function useScrollSpy(
  sections: readonly ScrollSection[],
  scrollTo: (id: string) => void
) {
  const [active, setActive] = useState("");
  const lockUntil = useRef(0);

  useEffect(() => {
    let frame: number | null = null;

    const update = () => {
      frame = null;
      if (Date.now() < lockUntil.current) return;

      const probe = window.innerHeight * 0.42;
      let current = "";

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element && element.getBoundingClientRect().top <= probe) {
          current = section.id;
        }
      }

      setActive((previous) => (previous === current ? previous : current));
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
  }, [sections]);

  const select = useCallback(
    (id: string) => {
      setActive(id);
      lockUntil.current = Date.now() + 1000;
      scrollTo(id);
    },
    [scrollTo]
  );

  return { active, select };
}
