"use client";

import clsx from "clsx";
import { useTheme } from "next-themes";
import { ReactNode, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

import InnerBody from "./inner-body";
import Logo from "./logo";

import { ID, LANGUAGE } from "@/config";
import { useTranslation } from "@/hooks/useTranslation";
import {
  useGetAllLanguagesMutation,
  useGetTranslationsWithPatternMutation,
} from "@/store/queries/language";
import { setTranslations } from "@/store/slices/languageSlice";
import { Language } from "@/types";
import webLocalStorage from "@/utils/webLocalStorage";
import webStorageClient from "@/utils/webStorageClient";

interface LanguageProviderProps {
  children: ReactNode;
}

function LanguageProvider({ children }: LanguageProviderProps) {
  const { theme } = useTheme();
  const navbarLogoRef = useRef<HTMLImageElement>(null);
  const introLogoRef = useRef<HTMLImageElement>(null);
  const [runAnimation, setRunAnimation] = useState(false);
  const [hideIntro, setHideIntro] = useState(true);
  const [animationStyles, setAnimationStyles] = useState<any>({});
  const [hideText, setHideText] = useState(false);
  const { t, currentLanguage } = useTranslation();

  const [getAllLanguage] = useGetAllLanguagesMutation();
  const [getTranslationsWithPattern] = useGetTranslationsWithPatternMutation();

  const dispatch = useDispatch();

  const handleMoveLogo = () => {
    setHideText(true);
    if (navbarLogoRef.current && introLogoRef.current) {
      const navbarLogoRect = navbarLogoRef.current.getBoundingClientRect();
      const introLogoRect = introLogoRef.current.getBoundingClientRect();

      // Calculate translation to center points
      const deltaX =
        navbarLogoRect.left +
        navbarLogoRect.width / 2 -
        (introLogoRect.left + introLogoRect.width / 2);
      const deltaY =
        navbarLogoRect.top +
        navbarLogoRect.height / 2 -
        (introLogoRect.top + introLogoRect.height / 2) -
        100; // Adjust for 50px offset (fine-tuned to half for precision)

      const scale = navbarLogoRect.width / introLogoRect.width;

      // Set animation styles
      setAnimationStyles({
        transform: `translate(${deltaX}px, ${deltaY}px) scale(${scale})`,
        transition: "transform 0.6s ease-in-out",
        position: "absolute",
      });

      // After animation completes, hide intro
      setTimeout(() => {
        setHideIntro(true);
      }, 550); // Match transition duration
    } else {
      // Fallback: skip animation
      setHideIntro(true);
    }
  };

  const handleLanguage = async () => {
    const language: Language = webStorageClient.get(LANGUAGE);
    const id: Language = webStorageClient.get(ID);

    if (!id || !language) setHideIntro(false);
    else setHideIntro(true);
    if (!language) {
      try {
        const languages: Language[] = await getAllLanguage(undefined).unwrap();
        const defaultLanguage = languages.find((lang) => lang.isDefault);

        if (!defaultLanguage) return;

        webStorageClient.set(LANGUAGE, defaultLanguage!.code);

        const translations = await getTranslationsWithPattern({
          code: defaultLanguage!.code,
          pattern: "SYSTEM_*",
        }).unwrap();

        webLocalStorage.set("translations", translations);
        dispatch(setTranslations(translations));
      } catch {}
    } else {
      const translations = webLocalStorage.get("translations");

      if (translations) {
        dispatch(setTranslations(translations));
      }
    }
    if (!id || !language) {
      const expires = new Date();

      expires.setHours(expires.getHours() + 24); // Add 24 hours
      setTimeout(() => {
        webStorageClient.set(ID, Math.random() * 20, { expires });
        setTimeout(handleMoveLogo, 2500);
        setRunAnimation(true);
      }, 500);
    }
  };

  useEffect(() => {
    handleLanguage();
  }, []);

  if (!currentLanguage) return null;

  return (
    <div className="min-h-screen">
      <InnerBody
        hideIntro={hideIntro}
        logo={
          <Logo
            innerRef={navbarLogoRef}
            runAnimation={hideIntro || runAnimation}
            theme={theme as any}
          />
        }
      >
        {children}
      </InnerBody>

      {/* Intro screen */}
      {!hideIntro && (
        <div className="svg-animation w-screen h-screen fixed top-0 left-0">
          <div className="w-fit h-fit absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-center noselect">
            <div className="w-[256px]" style={animationStyles}>
              <Logo
                innerRef={introLogoRef}
                runAnimation={runAnimation}
                size={256}
                theme={theme as any}
              />
            </div>
            <div className="min-w-10 h-[100px]">
              <div className={hideText ? "opacity-0" : ""}>
                {/* {isSuccess || (
                  <div className="flex gap-5 mx-auto w-fit mt-10">
                    <Spinner />
                    <p className="self-center">Đang tải...</p>
                  </div>
                )} */}
                <h1
                  className={clsx(
                    `text-5xl transition-all duration-500 delay-[600ms] ease-in-out font-space-crusaders ${
                      !runAnimation
                        ? "-translate-y-10 opacity-0"
                        : "translate-y-0 opacity-100"
                    }`,
                  )}
                >
                  VNExos
                </h1>
                <p
                  className={clsx(
                    `transition-all duration-500 delay-[1000ms] uppercase ease-in-out ${
                      !runAnimation
                        ? "-translate-y-10 opacity-0"
                        : "translate-y-0 opacity-100"
                    }`,
                  )}
                >
                  {t("SYSTEM_SLOGAN")}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LanguageProvider;
