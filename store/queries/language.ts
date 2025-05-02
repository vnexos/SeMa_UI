import { baseApi } from "../base";

import { languageEndpoint, translationEndpoint } from "@/config/endpoints";
import { Language } from "@/types";

export const languageApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllLanguages: builder.mutation<Language[], undefined>({
      query: (_) => ({
        url: languageEndpoint.GET_ALL,
        method: "GET",
        flashError: true,
      }),
    }),
    getLanguages: builder.query<Language[], undefined>({
      query: (_) => ({
        url: languageEndpoint.GET_ALL,
        method: "GET",
        flashError: true,
      }),
    }),
    getLanguageByCode: builder.query<Language, string>({
      query: (code) => ({
        url: languageEndpoint.GET_BY_ID.replaceAll("{code}", code),
        method: "GET",
        flashError: true,
      }),
    }),
    getTranslationsWithPattern: builder.mutation<
      any,
      { code: string; pattern: string }
    >({
      query: ({ code, pattern }) => ({
        url: translationEndpoint.GET_ALL.replace("{code}", code).replace(
          "{pattern}",
          pattern,
        ),
        method: "GET",
        flashError: true,
      }),
    }),
  }),
});

export const {
  useGetAllLanguagesMutation,
  useGetTranslationsWithPatternMutation,
  useGetLanguagesQuery,
  useGetLanguageByCodeQuery,
} = languageApi;
