// src/app/components/home/PopcornStyleGoLogo.tsx
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface PopcornStyleGoLogoProps {
  theme?: "mario" | "luigi";
}

const marioFontStyle = {
  fontFamily:
    "'Super Mario 256', 'Press Start 2P', 'Arial Black', 'Impact', sans-serif",
};

const PopcornStyleGoLogo: React.FC<PopcornStyleGoLogoProps> = ({
  theme = "mario",
}) => {
  const logoThemeConfig = {
    mario: {
      primaryTextColorClass: "text-yellow-400",
      hoverTextColor: "#FFC400",
      outlineColorHex: "#c53030",
      // Her setter vi inn Popcorn Time logoen for "mario" temaet
      imageSrc:
        "https://upload.wikimedia.org/wikipedia/commons/6/6c/Popcorn_Time_logo.png",
      imageAlt: "Go Game Popcorn Time Logo", // Oppdatert alt-tekst
      placeholderBgColor: "bg-red-500",
    },
    luigi: {
      primaryTextColorClass: "text-lime-400",
      hoverTextColor: "#76B900",
      outlineColorHex: "#006400",
      // Beholder denne som den var, med mindre du vil endre den også
      imageSrc:
        "https://www.transparentpng.com/thumb/super-mario/green-star-png-image-super-mario-maker-Vg1K7v.png",
      imageAlt: "Go Game Luigi Star Logo",
      placeholderBgColor: "bg-green-600",
    },
  };

  const currentTheme = logoThemeConfig[theme];

  const textOutlineStyle = {
    textShadow: `
      3px 3px 0px ${currentTheme.outlineColorHex},
      -3px 3px 0px ${currentTheme.outlineColorHex},
      3px -3px 0px ${currentTheme.outlineColorHex},
      -3px -3px 0px ${currentTheme.outlineColorHex},
      3px 0px 0px ${currentTheme.outlineColorHex},
      -3px 0px 0px ${currentTheme.outlineColorHex},
      0px 3px 0px ${currentTheme.outlineColorHex},
      0px -3px 0px ${currentTheme.outlineColorHex}
    `.replace(/\s+/g, " "),
  };

  return (
    <Link
      href="/"
      className="group flex flex-col items-center cursor-pointer no-underline"
      aria-label="Hjem"
    >
      <motion.div
        className="flex flex-col items-center space-y-2"
        whileHover={{ scale: 1.12, rotate: [0, 2, -2, 2, 0] }}
        transition={{
          type: "spring",
          stiffness: 350,
          damping: 12,
          rotate: { duration: 0.3, ease: "easeInOut" },
        }}
      >
        {/* Image-komponenten er gjeninnsatt her */}
        {currentTheme.imageSrc && ( // Sjekker om imageSrc finnes før rendering
          <Image
            src={currentTheme.imageSrc}
            alt={currentTheme.imageAlt}
            width={80} // Standard bredde for next/image optimalisering
            height={80} // Standard høyde for next/image optimalisering
            className="h-16 w-16 sm:h-20 sm:w-20 object-contain" // Visuell størrelse
            priority // Vurder 'priority' hvis logoen er kritisk for LCP (Largest Contentful Paint)
            onError={(e) => {
              // Fallback hvis bildet ikke lastes
              const target = e.target as HTMLImageElement;
              target.style.display = "none"; // Skjul det ødelagte bildet
              const placeholderParent = target.parentNode;
              if (placeholderParent) {
                // Unngå å legge til flere placeholdere
                if (
                  placeholderParent.querySelector(".error-placeholder-logo")
                ) {
                  return;
                }
                const placeholder = document.createElement("div");
                placeholder.textContent = "LOGO"; // Enkel tekst-placeholder
                placeholder.className = `error-placeholder-logo h-16 w-16 sm:h-20 sm:w-20 flex items-center justify-center ${currentTheme.placeholderBgColor} text-white font-bold rounded-lg border-2 border-gray-300 shadow-md`;
                placeholder.style.fontFamily = marioFontStyle.fontFamily; // Bruker Mario-fonten for placeholder også
                placeholderParent.insertBefore(placeholder, target.nextSibling);
              }
            }}
          />
        )}

        <motion.h1
          className={`text-4xl sm:text-5xl md:text-6xl font-black ${currentTheme.primaryTextColorClass} text-center tracking-wide`}
          style={{ ...marioFontStyle, ...textOutlineStyle }}
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 15,
            delay: 0.1,
          }}
          whileHover={{
            scale: 1.05,
            color: currentTheme.hoverTextColor,
            transition: { type: "spring", stiffness: 300, damping: 10 },
          }}
        >
          GO GAME
        </motion.h1>
      </motion.div>
    </Link>
  );
};

export default PopcornStyleGoLogo;
