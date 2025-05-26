// hooks/useThemeManager.ts
import { useState, useEffect, useCallback } from "react";

// TODO: Vurder å flytte fargekonfigurasjonene (og eventuelle andre temarelaterte konstanter)
//       til en egen konfigurasjonsfil (f.eks. `theme.config.ts` eller `constants/themeColors.ts`)
//       for bedre organisering, spesielt hvis antall temaer eller fargevariabler vokser.
const lightButtonColors = {
  primaryBg: "#FFD700",
  primaryText: "#2c2c2c",
  primaryBorder: "#B8860B",
  primaryShadow: "rgba(0,0,0,0.25)",
  secondaryBg: "#4ECDC4",
  secondaryText: "#FFFFFF",
  secondaryBorder: "#3AAFA9",
  secondaryShadow: "rgba(0,0,0,0.2)",
};

const darkButtonColors = {
  primaryBg: "#FFA000",
  primaryText: "#FFFFFF",
  primaryBorder: "#D46F00",
  primaryShadow: "rgba(0,0,0,0.35)",
  secondaryBg: "#20B2AA",
  secondaryText: "#FFFFFF",
  secondaryBorder: "#1A8C84",
  secondaryShadow: "rgba(0,0,0,0.3)",
};

const lightListItemColors = {
  bg: "#f9f9f9",
  text: "#333333",
  border: "#e0e0e0",
  hoverBg: "#efefef",
};

const darkListItemColors = {
  bg: "#2d3748",
  text: "#e2e8f0",
  border: "#4A5568",
  hoverBg: "#374151",
};

// TODO: Definer gjerne globale CSS-variabler for generelle sideelementer også her,
//       som --page-background, --text-primary, --card-background etc.,
//       og sett dem i applyThemeStyles. Dette gir en mer helhetlig temastyring.
//       Eksempel:
//       const globalLightColors = { pageBg: '#FFFFFF', textPrimary: '#222222', ... };
//       const globalDarkColors = { pageBg: '#121212', textPrimary: '#EEEEEE', ... };

export function useThemeManager() {
  const [theme, setThemeState] = useState<"light" | "dark">("light");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const prefersDark =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    // TODO: Vurder å ha en konstant for localStorage-nøkkelen ('goGameTheme')
    //       for å unngå skrivefeil hvis den brukes flere steder.
    const storedTheme = localStorage.getItem("goGameTheme") as
      | "light"
      | "dark"
      | null;

    let initialTheme: "light" | "dark" = "light";
    if (storedTheme) {
      initialTheme = storedTheme;
    } else if (prefersDark) {
      initialTheme = "dark";
    }
    setThemeState(initialTheme);
  }, []);

  const applyThemeStyles = useCallback((currentTheme: "light" | "dark") => {
    if (typeof window === "undefined") return;

    const root = document.documentElement;
    document.body.classList.remove(currentTheme === "light" ? "dark" : "light");
    document.body.classList.add(currentTheme);
    localStorage.setItem("goGameTheme", currentTheme); // TODO: Bruk konstant for nøkkelen her også.

    const currentButtonColors =
      currentTheme === "light" ? lightButtonColors : darkButtonColors;

    // TODO: For et stort antall CSS-variabler kan det være lurt å iterere over et objekt
    //       for å sette properties dynamisk, for å unngå repetitiv kode.
    //       Eksempel:
    //       Object.entries(currentButtonColors).forEach(([key, value]) => {
    //         root.style.setProperty(`--button-${key.toLowerCase()}`, value); // Krever litt navnejustering
    //       });
    //       Dette krever at nøklene i fargeobjektene er konsistente med ønskede CSS-variabelnavn.
    root.style.setProperty(
      "--button-primary-bg",
      currentButtonColors.primaryBg
    );
    root.style.setProperty(
      "--button-primary-text",
      currentButtonColors.primaryText
    );
    root.style.setProperty(
      "--button-primary-border",
      currentButtonColors.primaryBorder
    );
    root.style.setProperty(
      "--button-primary-shadow-color",
      currentButtonColors.primaryShadow
    );
    root.style.setProperty(
      "--button-secondary-bg",
      currentButtonColors.secondaryBg
    );
    root.style.setProperty(
      "--button-secondary-text",
      currentButtonColors.secondaryText
    );
    root.style.setProperty(
      "--button-secondary-border",
      currentButtonColors.secondaryBorder
    );
    root.style.setProperty(
      "--button-secondary-shadow-color",
      currentButtonColors.secondaryShadow
    );

    const currentListItemColors =
      currentTheme === "light" ? lightListItemColors : darkListItemColors;

    root.style.setProperty("--list-item-bg", currentListItemColors.bg);
    root.style.setProperty("--list-item-text", currentListItemColors.text);
    root.style.setProperty(
      "--list-item-border-color",
      currentListItemColors.border
    );
    root.style.setProperty(
      "--list-item-hover-bg",
      currentListItemColors.hoverBg
    );

    // TODO: Hvis du legger til globale fargevariabler (nevnt over), sett dem her også.
    //       const currentGlobalColors = currentTheme === 'light' ? globalLightColors : globalDarkColors;
    //       root.style.setProperty('--page-background', currentGlobalColors.pageBg);
    //       root.style.setProperty('--text-primary', currentGlobalColors.textPrimary);
  }, []);

  useEffect(() => {
    if (isMounted) {
      applyThemeStyles(theme);
    }
    // TODO: Selv om `applyThemeStyles` er memoized med `useCallback`, vil denne effekten
    //       kjøre på hver render hvor `theme` eller `isMounted` endres. Dette er forventet.
    //       For FOUC (Flash of Unstyled Content) - den beste løsningen er ofte å sette
    //       en initiell temaklasse på `<html>` eller `<body>` på serversiden (basert på en cookie)
    //       og deretter la denne hooken synkronisere. `suppressHydrationWarning` i RootLayout
    //       er en enklere, men akseptabel workaround.
  }, [theme, isMounted, applyThemeStyles]);

  const setTheme = (newTheme: "light" | "dark") => {
    setThemeState(newTheme);
  };

  // TODO: Vurder om hooken skal returnere noe mer, f.eks. en funksjon for å
  //       veksle tema direkte (`toggleTheme`) for enkelhets skyld i UI-komponenter.
  //       const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');
  return { theme, setTheme, isThemeReady: isMounted };
}
