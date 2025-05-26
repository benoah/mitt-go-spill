// src/app/components/home/StyledButton.tsx
"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion"; // TODO: PanInfo er importert, men ikke brukt. Kan fjernes hvis den ikke er tiltenkt for fremtidig bruk (f.eks. drag-interaksjoner).

interface StyledButtonProps extends React.PropsWithChildren {
  href?: string;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void; // TODO: Vurder å spesifisere elementtypen nærmere hvis mulig, f.eks. React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  variant?: "primary" | "secondary"; // TODO: Hvis flere varianter er planlagt (f.eks. 'danger', 'success', 'outline'), kan dette utvides.
  className?: string;
  type?: "button" | "submit" | "reset"; // Gjelder kun når 'as' er 'button'.
  as?: "button" | "a"; // TODO: Vurder om 'as' prop er den mest intuitive. Alternativt kunne man hatt separate komponenter (StyledLinkButton, StyledActionButton) eller basert det implisitt på om 'href' er satt. Nåværende løsning er vanlig og akseptabel.
  disabled?: boolean;
  // TODO: Vurder å legge til 'aria-label' eller andre a11y-props for å kunne overstyre/legge til mer spesifikk tilgjengelighetsinfo.
  // TODO: Vurder 'isLoading' prop for å vise en lasteindikator inne i knappen.
}

const StyledButton: React.FC<StyledButtonProps> = ({
  href,
  onClick,
  variant = "primary",
  children,
  className = "",
  type = "button",
  as = href ? "a" : "button", // Smart default basert på href
  disabled = false,
}) => {
  const baseClasses = `
    py-[10px] px-[20px] rounded-xl font-bold inline-flex items-center justify-center
    uppercase tracking-[0.5px] text-base leading-normal min-w-[180px]
    focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
  `;
  // TODO: 'min-w-[180px]' er ganske spesifikt. Vurder om dette alltid er ønskelig,
  //       eller om det bør være en prop, eller om knappen bør tilpasse seg innholdet som standard.
  //       Kan også løses med en utility-klasse som kan legges til via `className` prop ved behov.
  // TODO: Den utkommenterte `/* duration-[80ms] ease-out */` antyder at det var en CSS-overgang tidligere.
  //       Bekreft at Framer Motion nå håndterer alle ønskede overganger.

  const variantStyles = {
    primary: {
      bg: "bg-[var(--button-primary-bg)]",
      text: "text-[var(--button-primary-text)]",
      border: "border-[3px] border-[var(--button-primary-border)]",
      ringFocus: "focus-visible:ring-[var(--button-primary-border)]",
      shadowBase:
        "shadow-[0px_6px_0px_var(--button-primary-border),_2px_8px_10px_var(--button-primary-shadow-color)]",
      // TODO: For 'pressed' state, Framer Motion's `y: 2` simulerer dette.
      //       Hvis en faktisk endring i skyggen var ønsket (f.eks. mindre skygge når trykket),
      //       kunne man brukt `animate` prop på <motion.button> og styrt en custom variant
      //       basert på `isPressed` state (hvis man hadde en slik, f.eks. via `onTapStart`/`onTapEnd`).
      //       Nåværende løsning med y-offset er enkel og effektiv.
    },
    secondary: {
      bg: "bg-[var(--button-secondary-bg)]",
      text: "text-[var(--button-secondary-text)]",
      ringFocus: "focus-visible:ring-[var(--button-secondary-border)]",
      border: "border-[3px] border-[var(--button-secondary-border)]",
      shadowBase:
        "shadow-[0px_6px_0px_var(--button-secondary-border),_2px_8px_10px_var(--button-secondary-shadow-color)]",
    },
    // TODO: Hvis flere varianter legges til (f.eks. 'danger'), definer stiler for dem her.
  };

  const currentVariant = variantStyles[variant];

  // TODO: Vurder å bruke et bibliotek som `clsx` eller `classnames` for å sette sammen `className` strenger
  //       hvis de blir mer komplekse med flere betingelser. For nå er dette helt greit.
  const combinedClasses = `
    ${baseClasses}
    ${currentVariant.bg}
    ${currentVariant.text}
    ${currentVariant.border}
    ${currentVariant.ringFocus}
    ${currentVariant.shadowBase}
    ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
    ${className}
  `
    .trim()
    .replace(/\s+/g, " ");

  const motionProps = {
    whileHover: disabled
      ? {}
      : {
          scale: 1.03,
          // TODO: Vurder om `y` også skal animeres litt oppover på hover for en mer "løftet" effekt.
          transition: { type: "spring", stiffness: 400, damping: 10 },
        },
    whileTap: disabled
      ? {}
      : {
          scale: 0.97,
          y: 2, // Simulerer at knappen trykkes ned.
          // TODO: Vurder å justere `boxShadow` her hvis du vil ha en "flatere" skygge når knappen trykkes.
          //       Dette kan gjøres ved å animere til en annen stil, men krever mer state-håndtering.
        },
    transition: { type: "spring", stiffness: 400, damping: 17 }, // Generell overgang for andre endringer (f.eks. layout)
  };

  if (as === "a" && href) {
    // TODO: Sjekk om `motion(Link)` er den mest oppdaterte måten å gjøre Next.js Link "motion-aware" på.
    //       Ofte fungerer det bra, men det er verdt å dobbeltsjekke Framer Motion og Next.js dokumentasjon
    //       for anbefalt praksis, spesielt med tanke på prefetching og andre Link-spesifikke features.
    const MotionLink = motion(Link);

    const handleClickForLink = (e: React.MouseEvent<HTMLElement>) => {
      if (disabled) {
        e.preventDefault(); // Viktig for å forhindre navigasjon
        return;
      }
      if (onClick) {
        onClick(e); // Kaller den vanlige onClick-handleren hvis den finnes
      }
      // TODO: Vurder om `onClick` skal kalles *før* eller *etter* potensiell navigasjon,
      //       eller om det er spesifikke use-cases hvor rekkefølgen betyr noe.
      //       Nåværende implementasjon er vanlig.
    };

    return (
      <MotionLink
        href={disabled ? "#" : href} // Bruker "#" for deaktivert lenke for å unngå 404, men den vil ikke være navigerbar uansett.
        className={combinedClasses}
        onClick={handleClickForLink}
        aria-disabled={disabled} // Korrekt bruk for tilgjengelighet
        tabIndex={disabled ? -1 : undefined} // Fjerner fra tab-rekkefølge når deaktivert
        {...motionProps}
        // TODO: Hvis lenken åpner i nytt vindu (target="_blank"), husk å legge til rel="noopener noreferrer".
        //       Dette kan gjøres via `className` eller en dedikert prop.
      >
        {children}
      </MotionLink>
    );
  }

  const MotionButton = motion.button; // Standard motion-komponent for knapp

  return (
    <MotionButton
      type={type} // Korrekt bruk av 'type' for <button>
      className={combinedClasses}
      onClick={onClick}
      disabled={disabled}
      {...motionProps}
      // TODO: Vurder `aria-pressed` hvis knappen er en "toggle button".
      //       For vanlige handlingsknapper er ikke dette nødvendig.
    >
      {children}
    </MotionButton>
  );
};

export default StyledButton;
