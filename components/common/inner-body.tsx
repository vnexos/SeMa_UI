"use client";

import clsx from "clsx";
import { ReactNode, useMemo } from "react";

import { Navbar } from "./navbar";

import { useTranslation } from "@/hooks/useTranslation";

interface InnerBodyProps {
  children: ReactNode;
  logo: ReactNode;
  hideIntro: boolean;
}

function InnerBody({ children, logo, hideIntro }: Readonly<InnerBodyProps>) {
  const { isLoaded } = useTranslation();

  const loadedChildren = useMemo(
    () => (isLoaded ? <>{hideIntro && children}</> : null),
    [isLoaded, hideIntro],
  );

  return (
    <>
      <div className="pt-20">{loadedChildren}</div>
      {/* Pre-render Navbar */}
      <div className="w-full h-fit fixed top-0 left-0">
        <Navbar
          className={clsx(
            "transition-all duration-150 z-50",
            hideIntro ? "opacity-100" : "opacity-0",
          )}
          logo={logo}
        />
      </div>
    </>
  );
}

export default InnerBody;
