import Theme from "./Theme.interface";

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

export default ThemeProviderState;
