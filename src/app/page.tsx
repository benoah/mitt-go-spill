"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link"; // Importer Link for spill-listen
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

interface GameInfo {
  id: string;
  status: string;
  playerCount: number;
  createdAt: string; // Beholdes som string for dummy-data
}

export default function Home() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const [isLoadingGame, setIsLoadingGame] = useState(false);

  // State for aktive spill
  const [activeGames, setActiveGames] = useState<GameInfo[]>([]);
  const [isLoadingActiveGames, setIsLoadingActiveGames] = useState(true);

  useEffect(() => {
    setIsClient(true);
    const prefersDark =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    const storedTheme = localStorage.getItem("goGameTheme");
    let initialTheme: "light" | "dark" = "light";
    if (storedTheme === "dark" || storedTheme === "light") {
      initialTheme = storedTheme;
    } else if (prefersDark) {
      initialTheme = "dark";
    }
    setTheme(initialTheme);
  }, []);

  useEffect(() => {
    if (isClient) {
      const root = document.documentElement;
      document.body.classList.remove(theme === "light" ? "dark" : "light");
      document.body.classList.add(theme);
      localStorage.setItem("goGameTheme", theme);

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

      const listItemColors =
        theme === "light"
          ? {
              bg: "#f9f9f9",
              text: "#333333",
              border: "#e0e0e0",
              hoverBg: "#efefef",
            }
          : {
              bg: "#2d3748",
              text: "#e2e8f0",
              border: "#4A5568",
              hoverBg: "#374151",
            };

      root.style.setProperty("--list-item-bg", listItemColors.bg);
      root.style.setProperty("--list-item-text", listItemColors.text);
      root.style.setProperty("--list-item-border-color", listItemColors.border);
      root.style.setProperty("--list-item-hover-bg", listItemColors.hoverBg);
    }
  }, [theme, isClient]);

  /**
   * MIDLERTIDIG: Henter dummy-data for aktive spill siden API-et ikke er klart.
   */
  const fetchActiveGames = () => {
    console.log("fetchActiveGames: Laster dummy-data for aktive spill...");
    setIsLoadingActiveGames(true);
    // Simulerer en API-forsinkelse
    setTimeout(() => {
      const dummyGames: GameInfo[] = [
        {
          id: "dummy-123",
          status: "waiting_for_players",
          playerCount: 1,
          createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
        },
        {
          id: "dummy-456",
          status: "in_progress",
          playerCount: 2,
          createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
        },
        {
          id: "dummy-789",
          status: "waiting_for_players",
          playerCount: 0,
          createdAt: new Date(Date.now() - 1000 * 60 * 2).toISOString(),
        },
      ];
      setActiveGames(dummyGames);
      setIsLoadingActiveGames(false);
      console.log("fetchActiveGames: Dummy-data lastet.", dummyGames);
    }, 1000); // 1 sekund forsinkelse
  };

  // useEffect for å hente (dummy) aktive spill når klienten er klar
  useEffect(() => {
    if (isClient) {
      fetchActiveGames();
    }
  }, [isClient]);

  const handleStartNewGame = () => {
    setIsLoadingGame(true);
    console.log(
      "handleStartNewGame: Simulerer spillopprettelse (API ikke klar)..."
    );
    const tempGameId = `dev-game-${Math.random().toString(36).substring(2, 9)}`;
    setTimeout(() => {
      console.log(`handleStartNewGame: Navigerer til /spill/${tempGameId}`);
      router.push(`/spill/${tempGameId}`);
      // setIsLoadingGame(false); // Kan fjernes siden komponenten unmountes
    }, 500);
  };

  if (!isClient) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-slate-100 dark:bg-slate-900">
        <p className="text-lg text-slate-700 dark:text-slate-300">Loading...</p>
      </div>
    );
  }

  return (
    <div
      className={`grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-4 sm:p-8 md:p-12 gap-8 sm:gap-12 md:gap-16 font-[family-name:var(--font-geist-sans)] ${
        theme === "dark" ? "dark-theme-bg" : "light-theme-bg"
      }`}
    >
      <header className="w-full flex justify-center items-center py-2 md:py-2">
        <PopcornStyleGoLogo theme={theme} />
      </header>

      <main className="flex flex-col gap-8 items-center w-full max-w-md md:max-w-lg">
        <Slogan theme={theme} />

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <StyledButton
            as="button"
            onClick={handleStartNewGame}
            variant="primary"
            className="w-full sm:w-auto"
            disabled={isLoadingGame} // Viktig å ha med disabled her
          >
            <span className="mr-2">
              <PlayIcon />
            </span>
            {isLoadingGame ? "Oppretter..." : "Start Game"}
          </StyledButton>

          <StyledButton
            href="/spill-mot-ai"
            variant="secondary"
            className="w-full sm:w-auto"
          >
            Play against AI
          </StyledButton>
        </div>

        {/* Seksjon for aktive spill */}
        <div className="mt-12 w-full max-w-md md:max-w-lg">
          <h2 className="mb-4 text-2xl font-semibold text-[var(--list-item-text)] border-b-2 border-[var(--list-item-border-color)] pb-2">
            Pågående Spill
          </h2>
          {isLoadingActiveGames ? (
            <p className="text-[var(--list-item-text)]">Laster spill...</p>
          ) : activeGames.length > 0 ? (
            <ul className="space-y-3">
              {activeGames.map((game) => (
                <li
                  key={game.id}
                  className="p-4 border rounded-lg
                             bg-[var(--list-item-bg)] text-[var(--list-item-text)] border-[var(--list-item-border-color)]
                             hover:bg-[var(--list-item-hover-bg)] transition-colors duration-150"
                >
                  <Link // Bruker Next.js Link for intern navigasjon
                    href={`/spill/${game.id}`}
                    className="block group" // group for hover-effekter på barn
                  >
                    <h3 className="font-semibold group-hover:underline text-lg">
                      Spill ID: {game.id.substring(0, 8)}...
                    </h3>
                    <p className="text-sm opacity-80 mt-1">
                      ({game.playerCount}/2 spillere) - Status:{" "}
                      {game.status.replace(/_/g, " ")}
                    </p>
                    <small className="block text-xs opacity-60 mt-1">
                      Opprettet:{" "}
                      {new Date(game.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}{" "}
                      - {new Date(game.createdAt).toLocaleDateString()}
                    </small>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-[var(--list-item-text)]">
              Ingen aktive spill for øyeblikket.
            </p>
          )}
        </div>
      </main>
      {/*
      <footer className="py-4">
        <StyledButton onClick={() => setTheme(prev => prev === 'light' ? 'dark' : 'light')} variant="secondary">
          Bytt til {theme === 'light' ? 'Mørkt' : 'Lyst'} Tema
        </StyledButton>
      </footer>
      */}
    </div>
  );
}
