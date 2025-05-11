
"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

export interface ThemeProviderContext {
  theme: string;
  setTheme: (theme: string) => void;
}

export const ThemeProviderContext = React.createContext<ThemeProviderContext | undefined>(undefined);

export function ThemeProvider({
  children,
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = React.useState(props.defaultTheme || "light");

  React.useEffect(() => {
    const root = window.document.documentElement;
    
    root.classList.remove("light", "dark");
    
    if (theme === 'system') {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }
  }, [theme]);

  const value = React.useMemo(() => ({
    theme,
    setTheme: (newTheme: string) => {
      setTheme(newTheme);
    },
  }), [theme]);

  return (
    <ThemeProviderContext.Provider value={value}>
      <NextThemesProvider {...props}>
        {children}
      </NextThemesProvider>
    </ThemeProviderContext.Provider>
  );
}
