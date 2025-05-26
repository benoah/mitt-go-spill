// src/app/components/home/StyledButton.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";

interface StyledButtonProps extends React.PropsWithChildren {
  href?: string;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  variant?: "primary" | "secondary";
  className?: string;
  type?: "button" | "submit" | "reset"; // Kun relevant for <button>
  as?: "button" | "a"; // Bestemmer om det er en <button> eller <Link>/<a>
}

const StyledButton: React.FC<StyledButtonProps> = ({
  href,
  onClick,
  variant = "primary",
  children,
  className = "",
  type = "button", // Standard type for <button> elementer
  as = href ? "a" : "button", // Standard til 'a' hvis href er gitt, ellers 'button'
}) => {
  const [isPressed, setIsPressed] = useState(false);

  // Grunnleggende Tailwind-klasser for knappen
  const baseClasses = `
    py-[10px] px-[20px] rounded-xl font-bold inline-flex items-center justify-center
    uppercase tracking-[0.5px] transition-transform transition-shadow duration-[80ms]
    ease-out cursor-pointer text-base leading-normal min-w-[180px]
    focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
  `; // Fokusstiler for tilgjengelighet

  // Stilvarianter for primær og sekundær knapp
  const variantStyles = {
    primary: {
      bg: "bg-[var(--button-primary-bg)]",
      text: "text-[var(--button-primary-text)]",
      border: "border-[3px] border-[var(--button-primary-border)]",
      ringFocus: "focus-visible:ring-[var(--button-primary-border)]", // For focus-visible
      shadowBase:
        "shadow-[0px_6px_0px_var(--button-primary-border),_2px_8px_10px_var(--button-primary-shadow-color)]",
      shadowPressed:
        "shadow-[0px_2px_0px_var(--button-primary-border),_1px_3px_5px_var(--button-primary-shadow-color)]",
    },
    secondary: {
      bg: "bg-[var(--button-secondary-bg)]",
      text: "text-[var(--button-secondary-text)]",
      border: "border-[3px] border-[var(--button-secondary-border)]",
      ringFocus: "focus-visible:ring-[var(--button-secondary-border)]", // For focus-visible
      shadowBase:
        "shadow-[0px_6px_0px_var(--button-secondary-border),_2px_8px_10px_var(--button-secondary-shadow-color)]",
      shadowPressed:
        "shadow-[0px_2px_0px_var(--button-secondary-border),_1px_3px_5px_var(--button-secondary-shadow-color)]",
    },
  };

  const currentVariant = variantStyles[variant];

  // Kombinerer alle klassene
  const combinedClasses = `
    ${baseClasses}
    ${currentVariant.bg}
    ${currentVariant.text}
    ${currentVariant.border}
    ${currentVariant.ringFocus}
    ${isPressed ? currentVariant.shadowPressed : currentVariant.shadowBase}
    ${isPressed ? "translate-y-1" : "translate-y-0"}
    ${className}
  `
    .trim()
    .replace(/\s+/g, " "); // Fjerner overflødige mellomrom

  // Event-håndterere for visuell "trykket"-effekt
  const handleMouseDown = () => {
    setIsPressed(true);
    // onClick kalles ikke lenger her; det håndteres av det underliggende elementet
  };

  const handleMouseUp = () => {
    setIsPressed(false);
  };

  const handleMouseLeave = () => {
    if (isPressed) {
      setIsPressed(false); // Nullstill hvis musen forlater knappen mens den er trykket
    }
  };

  const handleFocus = (e: React.FocusEvent<HTMLElement>) => {
    // Forhindrer at knappen blir "sticky" hvis man tabber bort mens museknappen er nede
    if (isPressed && document.activeElement !== e.currentTarget) {
      setIsPressed(false);
    }
  };

  // Rendrer som en Next.js Link hvis 'as' er 'a' og 'href' er gitt
  if (as === "a" && href) {
    return (
      <Link
        href={href}
        className={combinedClasses}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        onBlur={() => setIsPressed(false)} // Sikrer at "pressed" tilstand fjernes ved blur
        onClick={onClick} // Next.js Link håndterer onClick for navigasjon eller egendefinert logikk
        // 'type' prop sendes ikke til Link/<a>
      >
        {children}
      </Link>
    );
  }

  // Ellers, rendrer som en standard <button>
  return (
    <button
      type={type} // 'type' er relevant for <button>
      className={combinedClasses}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={() => setIsPressed(false)}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default StyledButton;
