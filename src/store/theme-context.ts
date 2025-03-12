import { createContext } from "react";
import ThemeProviderState from "@/types/Theme-Provider-State.type";

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
};

export const ThemeProviderContext =
  createContext<ThemeProviderState>(initialState);
