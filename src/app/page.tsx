"use client";

import React, { useState, useEffect } from "react"; // useEffect er fortsatt brukt for fetchActiveGames
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  PopcornStyleGoLogo,
  PlayIcon,
  Slogan,
  StyledButton,
} from "./components/home"; // Antar at stien til komponentene er korrekt
import { motion } from "framer-motion";
import { useThemeManager } from "./hooks/useThemeManager"; // Importer hooken - juster stien om nødvendig

// Fargekonfigurasjonene (lightButtonColors, darkButtonColors) trengs ikke lenger her,
// da de håndteres inne i useThemeManager.ts

interface GameInfo {
  id: string;
  status: string;
  playerCount: number;
  createdAt: string;
}

export default function Home() {
  // Bruker useThemeManager hooken
  const { theme, setTheme, isThemeReady } = useThemeManager();

  const router = useRouter();
  const [isLoadingGame, setIsLoadingGame] = useState(false);
  const [activeGames, setActiveGames] = useState<GameInfo[]>([]);
  const [isLoadingActiveGames, setIsLoadingActiveGames] = useState(true);
  const [errorActiveGames, setErrorActiveGames] = useState<string | null>(null); // For feilhåndtering

  const globalMarioFontFamily =
    "'Super Mario 256', 'Press Start 2P', 'Arial Black', 'Impact', sans-serif";

  // Temarelatert useEffects er nå fjernet da useThemeManager håndterer dette.
  // isClient er erstattet med isThemeReady.

  const fetchActiveGames = () => {
    setIsLoadingActiveGames(true);
    setErrorActiveGames(null); // Nullstill feil før nytt forsøk
    setTimeout(() => {
      try {
        // Simuler en mulig feil for testing:
        // if (Math.random() > 0.8) {
        //   throw new Error("Kunne ikke laste spill akkurat nå!");
        // }
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
      } catch (err) {
        setErrorActiveGames(
          err instanceof Error
            ? err.message
            : "En ukjent feil oppstod under henting av spill."
        );
        setActiveGames([]); // Tøm listen ved feil
      } finally {
        setIsLoadingActiveGames(false);
      }
    }, 1000);
  };

  useEffect(() => {
    // Hent spill kun hvis temaet er klart (og vi dermed er på klienten)
    if (isThemeReady) {
      fetchActiveGames();
    }
  }, [isThemeReady]); // Avhengig av isThemeReady

  const handleStartNewGame = () => {
    setIsLoadingGame(true);
    const tempGameId = `dev-game-${Math.random().toString(36).substring(2, 9)}`;
    setTimeout(() => {
      router.push(`/spill/${tempGameId}`);
      // setIsLoadingGame(false); // Vurder å sette denne tilbake etter navigasjon eller ved feil
    }, 500);
  };

  // Bruker isThemeReady for å avgjøre om vi skal vise lasteindikator
  if (!isThemeReady) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <p className="text-lg text-gray-800 dark:text-gray-200">
          Laster tema...
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      {" "}
      {/* body class settes av useThemeManager */}
      <div
        className={`w-full max-w-2xl lg:max-w-3xl mx-auto p-6 sm:p-8 md:p-10 rounded-xl shadow-2xl my-8 sm:my-12 md:my-16 flex-grow
                    ${
                      theme === "dark" // Denne kan potensielt forenkles hvis du har globale CSS-regler
                        ? "dark-theme-content-bg" // Sørg for at disse klassene er definert i globals.css
                        : "light-theme-content-bg"
                    }`}
      >
        <main className="flex flex-col items-center gap-8 md:gap-10">
          <header className="w-full flex justify-center items-center mb-8 md:mb-10">
            <PopcornStyleGoLogo theme="mario" />{" "}
            {/* Antar at 'mario' tema for logo er statisk her */}
          </header>
          <Slogan theme={"mario"} />{" "}
          {/* Antar at 'mario' tema for slogan er statisk her */}
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
              href="/spill-mot-ai" // Sørg for at denne ruten eksisterer
              variant="secondary"
              className="w-full sm:w-auto flex-grow sm:flex-grow-0"
            >
              Play against AI
            </StyledButton>
          </div>
          <section className="mt-10 md:mt-12 w-full">
            <motion.h2
              className="mb-4 text-3xl sm:text-4xl md:text-5xl font-black text-yellow-400 text-center tracking-wide pb-2"
              style={{
                fontFamily: globalMarioFontFamily,
                textShadow:
                  "3px 3px 0px #c53030, -3px 3px 0px #c53030, 3px -3px 0px #c53030, -3px -3px 0px #c53030, 3px 0px 0px #c53030, -3px 0px 0px #c53030, 0px 3px 0px #c53030, 0px -3px 0px #c53030",
              }}
              initial={{ opacity: 0, y: -25, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 220,
                damping: 15,
                delay: 0.1,
              }}
            >
              Pågående Spill
            </motion.h2>

            {isLoadingActiveGames ? (
              <p className="text-center text-[var(--list-item-text)]">
                Laster spill...
              </p>
            ) : errorActiveGames ? (
              <p className="text-center text-red-500 dark:text-red-400">
                Feil: {errorActiveGames}
              </p>
            ) : activeGames.length > 0 ? (
              <ul className="space-y-4">
                {activeGames.map((game, index) => (
                  <motion.li
                    key={game.id}
                    className="p-4 border-2 rounded-xl shadow-lg cursor-pointer
                               transition-all duration-200 ease-out
                               bg-[var(--list-item-bg)] text-[var(--list-item-text)] border-[var(--list-item-border-color)]
                               hover:shadow-xl hover:scale-[1.03] hover:-translate-y-1
                               active:scale-[1.01] active:translate-y-0"
                    style={{ fontFamily: globalMarioFontFamily }}
                    initial={{ opacity: 0, y: 25, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                      duration: 0.35,
                      ease: [0.25, 0.1, 0.25, 1.0],
                      delay: index * 0.07,
                    }}
                  >
                    <Link
                      href={`/spill/${game.id}`} // Sørg for at denne ruten eksisterer
                      className="block group focus:outline-none"
                      aria-label={`Gå til spill ${game.id.substring(0, 8)}`}
                    >
                      <h3 className="font-bold group-hover:underline text-lg sm:text-xl tracking-wide break-words">
                        Spill ID: {game.id.substring(0, 8)}...
                      </h3>
                      <p className="text-sm opacity-85 mt-1 break-words">
                        ({game.playerCount}/2 spillere) - Status:{" "}
                        {game.status.replace(/_/g, " ")}
                      </p>
                      <small className="block text-xs opacity-70 mt-1.5">
                        Opprettet:{" "}
                        {new Date(game.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}{" "}
                        - {new Date(game.createdAt).toLocaleDateString()}
                      </small>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-[var(--list-item-text)]">
                Ingen aktive spill for øyeblikket. Prøv å laste siden på nytt.
              </p>
            )}
          </section>
        </main>
      </div>
      <footer className="w-full text-center py-6 mt-auto">
        <button
          onClick={
            () => setTheme(theme === "light" ? "dark" : "light") // Bruker setTheme fra hooken
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
