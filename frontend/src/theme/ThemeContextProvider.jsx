import { ThemeContext } from "./ThemeContext";
import { useColorTheme } from "./useColorTheme";

export const ThemeContextProvider = ({ children }) => {
  const value = useColorTheme();

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
