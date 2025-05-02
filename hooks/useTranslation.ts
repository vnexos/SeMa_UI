"use client";
import { useEffect } from "react";
import { useSelector } from "react-redux";

import { LANGUAGE } from "@/config";
import { RootState } from "@/store";
import { useGetLanguageByCodeQuery } from "@/store/queries/language";
import { Language, LanguageSettings } from "@/types";
import webStorageClient from "@/utils/webStorageClient";

/*
 * 60000196-4f33-f7af-9c49-08b9a61b608a vi-vn
 * 60000196-4f33-f7e3-af53-8bf3aeeac060 en-us
 * 60000196-4f33-f7f6-86a8-4d39c181a03a en-uk
 * 60000196-4f33-f809-8516-bbb93a1d341a ar-sa
 * 60000196-4f33-f81a-ac04-de7e95eada64 he-il
 *
 */
const fonts: LanguageSettings = {
  "60000196-4f33-f7af-9c49-08b9a61b608a": {
    font: "Be Vietnam Pro",
    background: "",
  },
  "60000196-4f33-f7e3-af53-8bf3aeeac060": {
    font: "Inter",
    background: "",
  },
  "60000196-4f33-f7f6-86a8-4d39c181a03a": {
    font: "Inter",
    background: "",
  },
  "60000196-4f33-f809-8516-bbb93a1d341a": {
    font: "Tajawal",
    background: "",
  },
  "60000196-4f33-f81a-ac04-de7e95eada64": {
    font: "Rubik",
    background: "",
  },
};

export function useTranslation() {
  const translations = useSelector(
    (state: RootState) => state.language.translations,
  );
  var language: string = webStorageClient.get(LANGUAGE);

  const { currentLanguage } = useGetLanguageByCodeQuery(language, {
    skip: !language,
    refetchOnMountOrArgChange: true,
    selectFromResult: ({ data }) => ({ currentLanguage: data as Language }),
  });

  useEffect(() => {
    if (
      typeof document !== "undefined" &&
      currentLanguage?.isRightToLeft !== undefined
    ) {
      document.documentElement.dir = currentLanguage.isRightToLeft
        ? "rtl"
        : "ltr";
      document.documentElement.lang = currentLanguage.code;
      document.documentElement.style.fontFamily =
        fonts[currentLanguage.id].font;
    }
  }, [currentLanguage]);

  const isLoaded = Object.keys(translations).length > 0;

  function t(key: string): string {
    return translations[key] || key; // Fallback to key if not found
  }

  return { t, isLoaded, currentLanguage };
}
