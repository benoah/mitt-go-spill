// src/app/components/home/Slogan.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";

interface SloganProps {
  theme?: "mario" | "luigi"; // TODO: Vurder om temaene kan utvides (f.eks. 'wario', 'peach') eller gjøres mer dynamiske hvis flere varianter er ønskelig i fremtiden.
  // TODO: Vurder en 'text' prop hvis slagordet skal kunne overstyres eksternt, i stedet for å være hardkodet i themeConfig.
}

const Slogan: React.FC<SloganProps> = ({ theme = "mario" }) => {
  // TODO: Sørg for at fonten 'Press_Start_2P' er lastet globalt (f.eks. i RootLayout.tsx eller globals.css via @font-face eller next/font)
  //       for å sikre at den alltid er tilgjengelig. Hvis den ikke er det, vil fallback-fonten brukes.
  const baseFontClass = "font-['Press_Start_2P']";

  // TODO: Hvis themeConfig blir veldig stor eller brukes andre steder, vurder å flytte den til en egen konfigurasjonsfil (f.eks. `constants/sloganThemes.ts`).
  const themeConfig = {
    mario: {
      textColorClass: "text-yellow-400",
      outlineColorHex: "#c53030",
      sloganText: "It's-a Go Time!",
    },
    luigi: {
      textColorClass: "text-lime-300",
      outlineColorHex: "#006400",
      sloganText: "Let's-a Go!",
    },
    // TODO: Legg til flere temaer her om nødvendig.
  };

  const currentTheme = themeConfig[theme];

  // TODO: textShadow for outline er en klassisk metode. For mer komplekse outlines eller for nettlesere
  //       som har bedre støtte, kan man vurdere -webkit-text-stroke (med fallback til text-shadow).
  //       Nåværende løsning er bredt støttet og ser bra ut for pixel-stil.
  // TODO: Hvis denne outline-stilen gjenbrukes (f.eks. på H2-titler), vurder å lage en global CSS utility-klasse for den.
  const textOutlineStyle = {
    textShadow: `
      2px 2px 0px ${currentTheme.outlineColorHex},
      -2px 2px 0px ${currentTheme.outlineColorHex},
      2px -2px 0px ${currentTheme.outlineColorHex},
      -2px -2px 0px ${currentTheme.outlineColorHex},
      2px 0px 0px ${currentTheme.outlineColorHex},
      -2px 0px 0px ${currentTheme.outlineColorHex},
      0px 2px 0px ${currentTheme.outlineColorHex},
      0px -2px 0px ${currentTheme.outlineColorHex}
    `.replace(/\s+/g, " "),
  };

  const sloganVariants = {
    hidden: { opacity: 0, y: 25, scale: 0.85 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 180,
        damping: 12,
        delay: 0.1, // TODO: Vurder om denne forsinkelsen skal være en prop hvis komponenten brukes i ulike kontekster hvor timing er viktig.
      },
    },
  };

  return (
    <motion.div
      className="mb-6 sm:mb-8 text-center"
      initial="hidden"
      animate="visible"
      variants={sloganVariants}
      // TODO: Vurder å legge til `role="heading"` og passende `aria-level` hvis dette semantisk sett fungerer som en overskrift på siden,
      //       selv om det er en <p>-tag inni. Alternativt, bruk en <h*>-tag direkte hvis det er mer passende.
      //       For et rent dekorativt slagord er <p> greit.
    >
      <p
        className={`
          ${baseFontClass}
          ${currentTheme.textColorClass}
          text-xl sm:text-2xl md:text-3xl 
          leading-snug sm:leading-normal md:leading-relaxed
          px-2 drop-shadow-sm 
        `}
        // TODO: `drop-shadow-sm` er en Tailwind-skyge. Sjekk om denne interagerer/konkurrerer visuelt med den egendefinerte `textOutlineStyle`.
        //       Det kan hende den er subtil nok til å fungere, eller at den ene gjør den andre overflødig.
        style={textOutlineStyle}
        // TODO: For tilgjengelighet, sørg for at fargekontrasten mellom tekstfargen (`currentTheme.textColorClass`)
        //       og den effektive bakgrunnsfargen (som kan variere basert på hvor komponenten plasseres) er tilstrekkelig.
        //       Outline hjelper på lesbarheten, men grunnfargekontrasten er fortsatt viktig.
      >
        {currentTheme.sloganText}
      </p>
    </motion.div>
  );
};

export default Slogan;
