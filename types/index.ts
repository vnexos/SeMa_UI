import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

type DefaultEntity = {
  id: string;
  createdAt: string;
  updatedAt: string;
};

export type Language = DefaultEntity & {
  code: string;
  name: string;
  flagUrl: string;
  description: string;
  isDefault: boolean;
  isRightToLeft: boolean;
};

type LanguageProfile = {
  font: string;
  background: string;
};

export type LanguageSettings = {
  [key: string]: LanguageProfile;
};
