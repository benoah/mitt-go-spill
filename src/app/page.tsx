// src/app/page.tsx
"use client";

import React, { useState, useEffect } from "react";
// Importer er nå gruppert
import {
  PopcornStyleGoLogo,
  PlayIcon,
  Slogan,
  StyledButton,
} from "./components/home";

// Definer fargekonfigurasjoner utenfor komponenten
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

export default function Home() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [isClient, setIsClient] = useState(false);

  // Effekt for å initialisere tema basert på systempreferanser og localStorage
  useEffect(() => {
    setIsClient(true); // Indikerer at klienten har lastet
    const prefersDark =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    const storedTheme = localStorage.getItem("goGameTheme");
    let initialTheme: "light" | "dark" = "light"; // Standard til lys
    if (storedTheme === "dark" || storedTheme === "light") {
      initialTheme = storedTheme;
    } else if (prefersDark) {
      initialTheme = "dark";
    }
    setTheme(initialTheme);
  }, []); // Kjører kun én gang etter første render

  // Effekt for å oppdatere body-klasse og CSS-variabler når temaet endres
  useEffect(() => {
    if (isClient) {
      const root = document.documentElement; // Cache documentElement

      // Oppdater body class for global styling
      document.body.classList.remove(theme === "light" ? "dark" : "light");
      document.body.classList.add(theme);
      localStorage.setItem("goGameTheme", theme);

      // Sett CSS variabler for knappene
      const currentButtonColors =
        theme === "light" ? lightButtonColors : darkButtonColors;

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
    }
  }, [theme, isClient]); // Kjører når tema eller isClient endres

  // Viser en lastemelding til klienten er klar
  if (!isClient) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-slate-100 dark:bg-slate-900">
        <p className="text-lg text-slate-700 dark:text-slate-300">Loading...</p>
      </div>
    );
  }

  // Hovedinnholdet på siden
  return (
    <div
      className={`grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-4 sm:p-8 md:p-12 gap-8 sm:gap-12 md:gap-16 font-[family-name:var(--font-geist-sans)] ${
        theme === "dark" ? "dark-theme-bg" : "light-theme-bg"
      }`}
    >
      {/* Definer .light-theme-bg og .dark-theme-bg i global CSS for bakgrunnsfarger */}
      <header className="w-full flex justify-center items-center py-2 md:py-2">
        <PopcornStyleGoLogo theme={theme} />
      </header>

      <main className="flex flex-col gap-8 items-center w-full max-w-md md:max-w-lg">
        <Slogan theme={theme} />

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <StyledButton
            href="/spill"
            variant="primary"
            className="w-full sm:w-auto"
          >
            <span className="mr-2">
              <PlayIcon />
            </span>
            Start Game
          </StyledButton>
          <StyledButton
            href="/spill-mot-ai"
            variant="secondary"
            className="w-full sm:w-auto"
          >
            Play against AI
          </StyledButton>
        </div>
      </main>
      {/* <footer className="py-4">
        Optional: Theme toggle button if needed
        <StyledButton onClick={() => setTheme(prev => prev === 'light' ? 'dark' : 'light')} variant="secondary">
          Bytt til {theme === 'light' ? 'Mørkt' : 'Lyst'} Tema
        </StyledButton>
      </footer> 
      */}
    </div>
  );
}
