"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  PlayIcon,
  PopcornStyleGoLogo,
  Slogan,
  StyledButton,
} from "@/app/components/home";

// Fargekonfigurasjoner for CSS-variabler (beholdes som de er)
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
  createdAt: string;
}

export default function Home() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const [isLoadingGame, setIsLoadingGame] = useState(false);
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

  const fetchActiveGames = () => {
    setIsLoadingActiveGames(true);
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
    }, 1000);
  };

  useEffect(() => {
    if (isClient) {
      fetchActiveGames();
    }
  }, [isClient]);

  const handleStartNewGame = () => {
    setIsLoadingGame(true);
    const tempGameId = `dev-game-${Math.random().toString(36).substring(2, 9)}`;
    setTimeout(() => {
      router.push(`/spill/${tempGameId}`);
    }, 500);
  };

  if (!isClient) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        {/* Du kan beholde din tidligere loading-stil her hvis du ønsker */}
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  return (
    // Ytterste container: fyller skjermen og bruker flex for å plassere footer nederst
    <div className="flex flex-col min-h-screen">
      {/* Innholds-wrapper: Dette blir "kortet". Sentrert med mx-auto og har maks bredde. */}
      {/* flex-grow gjør at denne containeren kan vokse og dytte footeren ned. */}
      <div
        className={`w-full max-w-2xl lg:max-w-3xl mx-auto p-6 sm:p-8 md:p-10 rounded-xl shadow-2xl my-8 sm:my-12 md:my-16 flex-grow
                    ${
                      theme === "dark"
                        ? "dark-theme-content-bg"
                        : "light-theme-content-bg"
                    }`}
      >
        {/* Headeren er nå INNE i den sentrerte content-wrapperen.
            w-full her betyr full bredde AV content-wrapperen.
            justify-center vil sentrere PopcornStyleGoLogo inne i headeren. */}
        <header className="w-full flex justify-center items-center mb-8 md:mb-10">
          <PopcornStyleGoLogo theme={theme} />
        </header>

        <main className="flex flex-col items-center gap-8 md:gap-10">
          <Slogan theme={theme} />

          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center max-w-md">
            <StyledButton
              as="button"
              onClick={handleStartNewGame}
              variant="primary"
              className="w-full sm:w-auto flex-grow sm:flex-grow-0"
              disabled={isLoadingGame}
            >
              <span className="mr-2">
                <PlayIcon />
              </span>
              {isLoadingGame ? "Oppretter..." : "Start Game"}
            </StyledButton>

            <StyledButton
              href="/spill-mot-ai"
              variant="secondary"
              className="w-full sm:w-auto flex-grow sm:flex-grow-0"
            >
              Play against AI
            </StyledButton>
          </div>

          <section className="mt-10 md:mt-12 w-full">
            <h2 className="mb-6 text-2xl sm:text-3xl font-semibold text-center text-[var(--list-item-text)] border-b-2 border-[var(--list-item-border-color)] pb-3">
              Pågående Spill
            </h2>
            {isLoadingActiveGames ? (
              <p className="text-center text-[var(--list-item-text)]">
                Laster spill...
              </p>
            ) : activeGames.length > 0 ? (
              <ul className="space-y-4">
                {activeGames.map((game) => (
                  <li
                    key={game.id}
                    className="p-4 border rounded-lg transition-all duration-150 ease-in-out
                               bg-[var(--list-item-bg)] text-[var(--list-item-text)] border-[var(--list-item-border-color)]
                               hover:bg-[var(--list-item-hover-bg)] hover:shadow-md"
                  >
                    <Link href={`/spill/${game.id}`} className="block group">
                      <h3 className="font-semibold group-hover:underline text-lg sm:text-xl">
                        Spill ID: {game.id.substring(0, 8)}...
                      </h3>
                      <p className="text-sm opacity-80 mt-1">
                        ({game.playerCount}/2 spillere) - Status:{" "}
                        {game.status.replace(/_/g, " ")}
                      </p>
                      <small className="block text-xs opacity-60 mt-1.5">
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
              <p className="text-center text-[var(--list-item-text)]">
                Ingen aktive spill for øyeblikket.
              </p>
            )}
          </section>
        </main>
      </div>{" "}
      {/* Slutten på innholds-wrapperen (kortet) */}
      {/* Footer plasseres utenfor "kortet", nederst på siden */}
      <footer className="w-full text-center py-6 mt-auto">
        {" "}
        {/* mt-auto dytter den ned */}
        <button
          onClick={() =>
            setTheme((prev) => (prev === "light" ? "dark" : "light"))
          }
          className={`px-4 py-2 text-xs rounded-md transition-colors mb-4
                        ${
                          theme === "light"
                            ? "bg-gray-200 hover:bg-gray-300 text-gray-700"
                            : "bg-gray-700 hover:bg-gray-600 text-gray-200"
                        }`}
        >
          Bytt til {theme === "light" ? "Mørkt" : "Lyst"} Tema
        </button>
        <p
          className={`text-xs opacity-60 ${
            theme === "dark" ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Go Spill &copy; {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
}
