import Theme from "../Theme.interface";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

export default ThemeProviderProps;
