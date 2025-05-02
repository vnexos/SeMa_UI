"use client";

import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/dropdown";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { LANGUAGE } from "@/config";
import { useTranslation } from "@/hooks/useTranslation";
import {
  useGetLanguagesQuery,
  useGetTranslationsWithPatternMutation,
} from "@/store/queries/language";
import { setTranslations } from "@/store/slices/languageSlice";
import { Language } from "@/types";
import webLocalStorage from "@/utils/webLocalStorage";
import webStorageClient from "@/utils/webStorageClient";

function LanguageSwitch() {
  const [isMounted, setIsMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { currentLanguage } = useTranslation();

  const [getTranslationsWithPattern] = useGetTranslationsWithPatternMutation();
  const dispatch = useDispatch();

  const { languages } = useGetLanguagesQuery(undefined, {
    selectFromResult: ({ data, isFetching }) => ({
      languages: [...(data ?? [])]
        .sort((a, b) => a.id.localeCompare(b.id))
        .filter((l) => l.description !== "NONLANGUAGE") as Language[],
      isFetching: isFetching,
    }),
  });

  const changeLanguage = async (id: string) => {
    if (!languages) return;
    const language = languages.find((lang) => lang.id === id);
    const expires = new Date();

    expires.setHours(expires.getHours() + 24); // Add 24 hours
    webStorageClient.set(LANGUAGE, language!.code, {
      expires,
    });

    const translations = await getTranslationsWithPattern({
      code: language!.code,
      pattern: "SYSTEM_*",
    }).unwrap();

    webLocalStorage.set("translations", translations);
    dispatch(setTranslations(translations));
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null; // ⛔ Don't render anything until mounted

  return (
    <>
      {/* Pre-render image */}
      <div className="hidden">
        {languages.map((language) => (
          <Image
            key={language.id}
            priority
            alt=""
            height={1}
            loading="eager"
            src={language.flagUrl}
            width={1}
          />
        ))}
      </div>

      <Dropdown
        isOpen={isOpen}
        placement={
          currentLanguage?.isRightToLeft ? "bottom-start" : "bottom-end"
        }
        shouldBlockScroll={false}
        onOpenChange={setIsOpen}
      >
        <DropdownTrigger>
          <div className="rounded-full cursor-pointer noselect">
            {currentLanguage && (
              <Image
                alt={currentLanguage?.flagUrl}
                height={35}
                src={currentLanguage?.flagUrl}
                width={35}
              />
            )}
          </div>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Static Actions"
          className="max-h-96 overflow-y-auto"
        >
          {languages.map((language) => (
            <DropdownItem
              key={language.id}
              textValue={language.name}
              onPress={() => changeLanguage(language.id)}
            >
              <div className="flex gap-5 flex-row">
                <Image
                  alt={language.flagUrl}
                  height={35}
                  src={language.flagUrl}
                  width={35}
                />
                <p className="self-center">{language.name}</p>
              </div>
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </>
  );
}

export default LanguageSwitch;
