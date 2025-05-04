"use client";

import { Code } from "@heroui/code";
import { Link } from "@heroui/link";
import { Snippet } from "@heroui/snippet";
import { button as buttonStyles } from "@heroui/theme";
import dynamic from "next/dynamic";

import { subtitle, title } from "@/components/common/primitives";

const LoginBackground = dynamic(() => import("./LoginBackground"), {
  ssr: false,
});

function LoginModule() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <LoginBackground />
      <div className="inline-block max-w-xl text-center justify-center z-10">
        <span className={title()}>Make&nbsp;</span>
        <span className={title({ color: "violet" })}>beautiful&nbsp;</span>
        <br />
        <span className={title()}>
          websites regardless of your design experience.
        </span>
        <div className={subtitle({ class: "mt-4" })}>
          Beautiful, fast and modern React UI library.
        </div>
      </div>

      <div className="flex gap-3">
        <Link
          isExternal
          className={buttonStyles({
            color: "primary",
            radius: "full",
            variant: "shadow",
          })}
        >
          Documentation
        </Link>
      </div>

      <div className="mt-8">
        <Snippet hideCopyButton hideSymbol variant="bordered">
          <span>
            Get started by editing <Code color="primary">app/page.tsx</Code>
          </span>
        </Snippet>
      </div>
    </section>
  );
}

export default LoginModule;
