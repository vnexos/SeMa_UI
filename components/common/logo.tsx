import Image from "next/image";

function Logo({
  theme = "dark",
  runAnimation,
  size = 40,
  innerRef,
}: Readonly<{
  theme?: "dark" | "light";
  runAnimation: boolean;
  width?: string;
  height?: string;
  size?: number;
  innerRef?: any;
}>) {
  const glowClass = runAnimation ? `glow-logo-${theme}` : "";

  return (
    <Image
      ref={innerRef}
      priority
      alt="logo"
      className={`transition-[filter] text-center ease-in-out duration-500 object-contain ${glowClass}`}
      draggable={false}
      height={size}
      src={`/logo-dark.svg`} // Also note: use / not ./
      width={size}
    />
  );
}

export default Logo;
