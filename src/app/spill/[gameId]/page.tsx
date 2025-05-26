// src/app/spill/[gameId]/page.tsx
"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
// import io, { Socket } from "socket.io-client"; // Midlertidig kommentert ut
import { useParams } from "next/navigation";

// Midlertidig kommentert ut siden AetherGoLogo.tsx kanskje ikke er laget
// import AetherGoLogo from "../../components/AetherGoLogo";

// Midlertidig kommentert ut siden GameBoard3D.tsx ikke er laget
// import type { GameBoard3DProps } from "../../components/GameBoard3D";

// Midlertidig kommentert ut siden goEngine.ts ikke er laget
/*
import {
  BOARD_SIZE as ENGINE_BOARD_SIZE,
  Coordinate,
} from "../../lib/goEngine"; 
*/

// MIDLERTIDIGE PLACEHOLDERE for goEngine-importer:
const ENGINE_BOARD_SIZE: number = 13; // Sett en standard brettstørrelse
interface Coordinate {
  // Enkel placeholder for Coordinate-typen
  x: number;
  y: number;
}
// SLUTT PÅ MIDLERTIDIGE PLACEHOLDERE

import { PopcornStyleGoLogo } from "@/app/components/home";

// Midlertidig kommentert ut dynamisk import av GameBoard3D
/*
const GameBoard3DWithNoSSR = dynamic<GameBoard3DProps>(
  () => import("../../components/GameBoard3D").then((mod) => mod.default),
  {
    ssr: false,
    loading: () => (
      <div
        className="flex items-center justify-center w-full max-w-lg aspect-square my-4 border border-dashed border-gray-300 dark:border-gray-700 rounded-lg"
      >
        <p className="text-gray-500 dark:text-gray-400">Laster spillbrett...</p>
      </div>
    ),
  }
);
*/

const GameBoard3DPlaceholder = () => (
  <div className="flex items-center justify-center w-full max-w-lg aspect-square my-4 border-2 border-dashed border-gray-400 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800">
    <p className="text-gray-600 dark:text-gray-300">
      Spillbrett kommer her (GameBoard3D)
    </p>
  </div>
);

const createEmptyBoard = (): number[][] =>
  Array(ENGINE_BOARD_SIZE) // Bruker nå den lokale placeholder-verdien
    .fill(null)
    .map(() => Array(ENGINE_BOARD_SIZE).fill(0));

interface ChatMessage {
  senderSocketId: string;
  senderDisplayName: string;
  text: string;
  timestamp: string;
}

export default function SpillMedIdPage() {
  const params = useParams();
  const urlGameId = params?.gameId as string | undefined;

  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [isClient, setIsClient] = useState(false);

  const [boardState, setBoardState] = useState<number[][]>(createEmptyBoard);
  const [currentPlayer, setCurrentPlayer] = useState<number>(1);
  const [gameMessage, setGameMessage] = useState<string>("Laster spill...");
  const [koPoint, setKoPoint] = useState<Coordinate | null>(null); // Bruker nå lokal placeholder Coordinate-type
  const [gameId, setGameId] = useState<string | null>(null);

  useEffect(() => {
    setIsClient(true);
    if (urlGameId) {
      setGameId(urlGameId);
      setGameMessage(`Spill ID: ${urlGameId}. Klar til å vise spill.`);
    } else {
      setGameMessage("Ingen spill-ID funnet i URL.");
    }

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

    const root = document.documentElement;
    document.body.classList.remove(initialTheme === "light" ? "dark" : "light");
    document.body.classList.add(initialTheme);
  }, [urlGameId]);

  const handleMakeMove = useCallback(
    (x: number, y: number) => {
      console.log(
        `(Placeholder) Trekk på (${x}, ${y}) av spiller ${currentPlayer}`
      );
      if (boardState[y][x] === 0) {
        const newBoard = boardState.map((row, rowIndex) =>
          rowIndex === y
            ? row.map((cell, colIndex) =>
                colIndex === x ? currentPlayer : cell
              )
            : row
        );
        setBoardState(newBoard);
        setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
        setGameMessage(
          `Spiller ${currentPlayer === 1 ? "Hvit" : "Svart"} sin tur.`
        );
      } else {
        setGameMessage("Ugyldig trekk: Feltet er opptatt.");
      }
    },
    [boardState, currentPlayer]
  );

  if (!isClient || !gameId) {
    return (
      <div
        className={`flex justify-center items-center min-h-screen ${
          theme === "dark" ? "bg-slate-900" : "bg-slate-100"
        }`}
      >
        <p
          className={`text-lg ${
            theme === "dark" ? "text-slate-300" : "text-slate-700"
          }`}
        >
          {gameMessage}
        </p>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen flex flex-col items-center p-4 sm:p-8 ${
        theme === "dark"
          ? "dark-theme-bg-spill text-white"
          : "light-theme-bg-spill text-black"
      }`}
    >
      <header className="w-full flex justify-center items-center py-2 md:py-2">
        <PopcornStyleGoLogo theme={theme} />
      </header>

      <section className="text-center my-4">
        <h1 className="text-xl font-semibold">Spill ID: {gameId}</h1>
        <p className="text-lg">
          Nåværende spiller: {currentPlayer === 1 ? "Svart" : "Hvit"}
        </p>
        {gameMessage && <p className="italic text-sm mt-1">{gameMessage}</p>}
        {koPoint && (
          <p className="text-xs italic">
            Ko: ({koPoint.x}, {koPoint.y})
          </p>
        )}
      </section>

      <section className="w-full max-w-lg aspect-square my-4">
        {isClient && <GameBoard3DPlaceholder />}
      </section>

      <section className="my-4">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          (Knapper og chat kommer her)
        </p>
      </section>

      <footer className="mt-auto pt-8">
        <Link
          href="/"
          className={`px-6 py-3 rounded-lg font-semibold underline transition-opacity hover:opacity-80 ${
            theme === "light"
              ? "text-blue-600 bg-blue-100/50 hover:bg-blue-100"
              : "text-blue-300 bg-blue-800/30 hover:bg-blue-800/50"
          }`}
        >
          Tilbake til forsiden
        </Link>
      </footer>
    </div>
  );
}
