import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LanguageState {
  translations: Record<string, string>;
}

const initialState: LanguageState = {
  translations: {},
};

export const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setTranslations(state, action: PayloadAction<Record<string, string>>) {
      state.translations = action.payload;
    },
  },
});

export const { setTranslations } = languageSlice.actions;
export default languageSlice.reducer;
